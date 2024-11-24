import { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { queryLLMForSpeechToText } from "../infra/queryLLM";
import { publicProcedure } from "../trpc";

export const voiceRouter = {
  getTranscription: publicProcedure
    .input(
      z.object({
        audioBase64: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const audioBuffer = Buffer.from(input.audioBase64, "base64");
        return await queryLLMForSpeechToText(audioBuffer);
      } catch (error) {
        console.error(error);
        return { transcription: "Failed to transcribe" };
      }
    }),
} satisfies TRPCRouterRecord;
