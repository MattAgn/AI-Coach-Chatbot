import type { TRPCRouterRecord } from "@trpc/server";
import OpenAI from "openai";
import { z } from "zod";

import { publicProcedure } from "../trpc";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatbotRouter = {
  getChatGptResponse: publicProcedure
    .input(z.object({ message: z.string() }))
    .mutation(async ({ input }) => {
      const chatCompletion = await client.chat.completions.create({
        messages: [{ role: "user", content: input.message }],
        model: "gpt-4o",
      });

      return {
        botResponse:
          chatCompletion.choices[0]?.message.content ?? "I have nothing to say",
      };
    }),
} satisfies TRPCRouterRecord;
