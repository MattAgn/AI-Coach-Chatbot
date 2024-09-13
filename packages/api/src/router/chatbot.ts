import type { TRPCRouterRecord } from "@trpc/server";
import OpenAI from "openai";
import { StreamChat } from "stream-chat";
import { z } from "zod";

import { adaptStreamMessagesToGptMessages } from "../infra/adaptStreamMessagesToGptMessages";
import { publicProcedure } from "../trpc";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

export const chatbotRouter = {
  getChatGptResponse: publicProcedure
    .input(
      z.object({ category: z.nativeEnum(Category), channelId: z.string() }),
    )
    .mutation(async ({ input }) => {
      if (!STREAM_API_KEY || !STREAM_SECRET) {
        throw new Error("STREAM_API_KEY and STREAM_SECRET are required");
      }

      const chatClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_SECRET);

      const channel = chatClient.channel(input.category, input.channelId);

      const { messages: chatHistory } = await channel.query({
        messages: { limit: 30 },
      });

      const chatCompletion = await client.chat.completions.create({
        messages: [
          {
            role: "system",
            content: getCoachingPrompt(input.category),
          },
          ...adaptStreamMessagesToGptMessages(chatHistory),
        ],
        model: "gpt-4o",
        temperature: 0.2,
      });

      const message =
        chatCompletion.choices[0]?.message.content ??
        "Sorry i'm asleep right now, come back later";

      const gptmessage = {
        text: message,
        user_id: coachByChannel[input.category],
      };

      return { botResponse: message };
    }),
} satisfies TRPCRouterRecord;

const getCoachingPrompt = (category: Category) => `
You are an expert ${category.toLowerCase()} coach. 
You are friendly and casual. 
You asks questions first before giving concise solutions. 
You decline if you get asked questions on topics other than your expertise.
You don't hesitate to say when you're not sure about something.
Unless asked otherwise, don't reply with more than 6 sentences
`;
