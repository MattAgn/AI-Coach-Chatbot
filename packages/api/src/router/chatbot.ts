import type { TRPCRouterRecord } from "@trpc/server";
import OpenAI from "openai";
import { StreamChat } from "stream-chat";
import { z } from "zod";

import { publicProcedure } from "../trpc";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const STREAM_API_KEY = process.env.STREAM_API_KEY;
const STREAM_SECRET = process.env.STREAM_SECRET;

export enum ChannelId {
  Sleep = "Sleep",
  Nutrition = "Nutrition",
  Sport = "Sport",
}

const coachByChannel: Record<ChannelId, string> = {
  [ChannelId.Sleep]: "sleep-ai-coach",
  [ChannelId.Nutrition]: "nutrition-ai-coach",
  [ChannelId.Sport]: "sport-ai-coach",
};

export const chatbotRouter = {
  getChatGptResponse: publicProcedure
    .input(
      z.object({ message: z.string(), channelId: z.nativeEnum(ChannelId) }),
    )
    .mutation(async ({ input }) => {
      const chatCompletion = await client.chat.completions.create({
        messages: [{ role: "user", content: input.message }],
        model: "gpt-4o",
      });

      const message =
        chatCompletion.choices[0]?.message.content ??
        "Sorry i'm asleep right now, come back later";

      if (!STREAM_API_KEY || !STREAM_SECRET) {
        throw new Error("STREAM_API_KEY and STREAM_SECRET are required");
      }

      const chatClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_SECRET);

      const channel = chatClient.channel("Chatgpt", input.channelId, {});

      const gptmessage = {
        text: message,
        user_id: coachByChannel[input.channelId],
      };
      channel.sendMessage(gptmessage);
      return { botResponse: message };
    }),
} satisfies TRPCRouterRecord;
