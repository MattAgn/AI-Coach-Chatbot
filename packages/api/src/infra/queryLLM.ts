import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

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
    ...llmOptions,
  });

  const reply = chatNameCompletion.choices[0]?.message.content;

  if (!reply) {
    throw new Error("No reply from LLM");
  }
  return reply;
};
