import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { z } from "zod";

const openAiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const llmOptions = {
  model: "gpt-4o-mini",
  temperature: 0.2,
};

type QueryLLMWithHistoryParams = {
  conversationHistory: ChatCompletionMessageParam[];
  systemMessage: string;
};

const ChatMessage = z.object({
  type: z.union([
    z
      .literal("AUDIO")
      .describe(
        "if the message is meant to be transformed into an audio file, such as sleeping meditation",
      ),
    z.literal("TEXT").describe("if the message is a regular text message"),
  ]),
  message: z.string(),
});

export const queryLLM = async (userMessage: string) => {
  const chatNameCompletion = await openAiClient.chat.completions.create({
    messages: [
      {
        role: "user",
        content: userMessage,
      },
    ],
    ...llmOptions,
  });

  const reply = chatNameCompletion.choices[0]?.message.content;

  if (!reply) {
    throw new Error("No reply from LLM");
  }

  return reply;
};

export const queryLLMWithHistory = async ({
  conversationHistory,
  systemMessage,
}: QueryLLMWithHistoryParams) => {
  const chatNameCompletion = await openAiClient.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      ...conversationHistory,
    ],
    response_format: zodResponseFormat(ChatMessage, "chat_message"),
    ...llmOptions,
  });

  const reply = JSON.parse(
    chatNameCompletion.choices[0]?.message.content ?? "{}",
  );

  if (!reply) {
    throw new Error("No reply from LLM");
  }
  return reply;
};

export const queryLLMForSound = async (text: string) => {
  const mp3 = await openAiClient.audio.speech.create({
    model: "tts-1",
    input: text,
    voice: "nova",
    speed: 0.85,
  });
  const buffer = Buffer.from(await mp3.arrayBuffer());

  return buffer;
};
