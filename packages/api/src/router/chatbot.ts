import type { TRPCRouterRecord } from "@trpc/server";
import { StreamChat } from "stream-chat";
import { z } from "zod";

import { adaptStreamMessagesToGptMessages } from "../infra/adaptStreamMessagesToGptMessages";
import { queryLLM, queryLLMWithHistory } from "../infra/queryLLM";
import { publicProcedure } from "../trpc";

const STREAM_API_KEY = process.env.STREAM_API_KEY;
const STREAM_SECRET = process.env.STREAM_SECRET;

export enum Category {
  Sleep = "Sleep",
  Nutrition = "Nutrition",
  Sport = "Sport",
}

const coachByChannel: Record<Category, string> = {
  [Category.Sleep]: "sleep-ai-coach",
  [Category.Nutrition]: "nutrition-ai-coach",
  [Category.Sport]: "sport-ai-coach",
};
const DEFAULT_CHAT_NAME = "NO_NAME";
const getLegeacyChatNamePrefix = (category: Category) => `${category}-`;

export const chatbotRouter = {
  getChatGptResponse: publicProcedure
    .input(
      z.object({ category: z.nativeEnum(Category), channelId: z.string() }),
    )
    .mutation(async ({ input }) => {
      try {
        if (!STREAM_API_KEY || !STREAM_SECRET) {
          throw new Error("STREAM_API_KEY and STREAM_SECRET are required");
        }

        const chatClient = StreamChat.getInstance(
          STREAM_API_KEY,
          STREAM_SECRET,
        );

        const channel = chatClient.channel(input.category, input.channelId);

        const { messages: chatHistory } = await channel.query({
          messages: { limit: 30 },
        });

        if (
          channel.data?.name === DEFAULT_CHAT_NAME ||
          channel.data?.name?.startsWith(
            getLegeacyChatNamePrefix(input.category),
          )
        ) {
          const chatName = await queryLLM(
            getChatNamePrompt(chatHistory.map((m) => m.text ?? "")),
          );

          await channel.update({ name: chatName });
        }

        const llmReply = await queryLLMWithHistory({
          systemMessage: getCoachingPrompt(input.category),
          conversationHistory: adaptStreamMessagesToGptMessages(chatHistory),
        });

        const llmMessage = {
          text: llmReply,
          user_id: coachByChannel[input.category],
        };
        channel.sendMessage(llmMessage);

        return;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to get chat response");
      }
    }),
} satisfies TRPCRouterRecord;

const getCoachingPrompt = (category: Category) => `
You are an expert ${category.toLowerCase()} coach with over 20 years of experience in the field. 
You are friendly and casual. 
You asks questions first before giving concise solutions. 
You decline if you get asked questions on topics other than your expertise.
You don't hesitate to say when you're not sure about something.
Unless asked otherwise, don't reply with more than 6 sentences
`;

const getChatNamePrompt = (messages: string[]) => `
  Based on the following messages that are part of a coaching chat, 
  propose a short name for the chat (no more that 6 words) in the same language as the messages.
  The name should be the main topic of the chat.
  It should not contain the word chat as it is already implied.
  Reply with ONLY the name of the chat, nothing else
  If you can't come up with a suitable name due to lack of information, reply with "${DEFAULT_CHAT_NAME}".

  The messages: 
  ${messages.join("\n")}
`;
