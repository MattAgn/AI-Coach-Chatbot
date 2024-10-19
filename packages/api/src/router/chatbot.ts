import type { TRPCRouterRecord } from "@trpc/server";
import { Channel, MessageResponse } from "stream-chat";
import * as uuid from "uuid";
import { z } from "zod";

import { adaptStreamMessagesToGptMessages } from "../infra/adaptStreamMessagesToGptMessages";
import {
  queryLLM,
  queryLLMForSound,
  queryLLMWithHistory,
} from "../infra/queryLLM";
import { getChatClient } from "../lib/chat";
import { publicProcedure } from "../trpc";

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

const DEFAULT_CHAT_NAME = "Chat";
const getLegeacyChatNamePrefix = (category: Category) => `${category}-`;

export const chatbotRouter = {
  getChatGptResponse: publicProcedure
    .input(
      z.object({ category: z.nativeEnum(Category), channelId: z.string() }),
    )
    .mutation(async ({ input }) => {
      try {
        const channel = getChatClient().channel(
          input.category,
          input.channelId,
        );

        const { messages: chatHistory } = await channel.query({
          messages: { limit: 30 },
        });

        const newChatName = await updateChatNameIfNeeded({
          channel,
          category: input.category,
          chatHistory,
        });

        const llmReply = await queryLLMWithHistory({
          systemMessage: getCoachingPrompt(input.category),
          conversationHistory: adaptStreamMessagesToGptMessages(chatHistory),
        });

        if (llmReply.type === "AUDIO") {
          await sendAudioMessage({
            channel,
            message: llmReply.message,
            coachId: coachByChannel[input.category],
          });
        } else {
          const llmMessage = {
            text: llmReply.message,
            user_id: coachByChannel[input.category],
          };
          channel.sendMessage(llmMessage);
        }
        return { newChatName };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to get chat response");
      }
    }),
} satisfies TRPCRouterRecord;

/* Handles meditations only for now */
const sendAudioMessage = async ({
  channel,
  coachId,
  message,
}: {
  channel: Channel;
  message: string;
  coachId: string;
}) => {
  await channel
    .sendMessage({
      user_id: coachId,
      text: "C'est noté, je prépare la méditation",
    })
    .catch(console.error);

  const audioBuffer = await queryLLMForSound(message);

  const fileName = `audio-${uuid.v4()}.mp3`;
  const fileSentResponse = await channel.sendFile(
    audioBuffer,
    fileName,
    "audio/mpeg",
    { id: coachId },
  );

  await channel.sendMessage({
    user_id: coachId,
    text: "Voici la méditation",
    attachments: [
      {
        type: "audio",
        asset_url: fileSentResponse.file,
      },
    ],
  });
};

const updateChatNameIfNeeded = async ({
  channel,
  category,
  chatHistory,
}: {
  channel: Channel;
  category: Category;
  chatHistory: MessageResponse[];
}) => {
  const shouldUpdateChatName =
    channel.data?.name === DEFAULT_CHAT_NAME ||
    channel.data?.name?.startsWith(getLegeacyChatNamePrefix(category));

  if (shouldUpdateChatName) {
    const chatContext = chatHistory.map((message) => message.text ?? "");
    const newChatName = await queryLLM(getChatNamePrompt(chatContext));
    await channel.update({ name: newChatName });
    return newChatName;
  }

  return null;
};

const getCoachingPrompt = (category: Category) => `
You are an expert ${category.toLowerCase()} coach with over 20 years of experience in the field. 
You are friendly and casual. 
You asks questions first before giving concise solutions. 
You decline if you get asked questions on topics other than your expertise.
You don't hesitate to say when you're not sure about something and redirect to a professional if needed.
Unless asked otherwise, don't reply with more than 6 sentences.
${category === Category.Sleep ? getSpecificSleepingPrompt() : ""}
`;

const getSpecificSleepingPrompt =
  () => `If the person is having trouble sleeping, you suggest everytime, 
among other ideas, a sleeping meditation to fall asleep. 
Ask the user a few questions (in one message) to help you create the meditation.
You propose either a short one or a long one, depending on the user's preference. Short should be around 400 words, 
long meditation around 2000 words.
The meditation should be calming and relaxing, and not contain any disturbing elements.
It will then be sent as an audio file.
`;

const getChatNamePrompt = (messages: string[]) => `
  Based on the following messages that are part of a coaching chat, 
  propose a short name for the chat (no more that 4 words) in the same language as the messages.
  The name should be the main topic of the chat.
  It should not contain the word chat as it is already implied.
  Reply with ONLY the name of the chat, nothing else
  If you can't come up with a suitable name due to lack of information, reply with "${DEFAULT_CHAT_NAME}".

  The messages: 
  ${messages.join("\n")}
`;
