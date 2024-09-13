import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { DefaultGenerics, MessageResponse } from "stream-chat";

export const adaptStreamMessagesToGptMessages = (
  messages: MessageResponse<DefaultGenerics>[],
): ChatCompletionMessageParam[] =>
  messages.map((message) => ({
    role: message?.user?.role === "user" ? "user" : "assistant",
    content: message.text ?? "",
  }));
