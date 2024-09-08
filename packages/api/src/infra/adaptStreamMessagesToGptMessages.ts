import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { DefaultGenerics, Message, MessageResponse } from "stream-chat";

export const adaptStreamMessagesToGptMessages = (
  messages: MessageResponse<DefaultGenerics>[],
): ChatCompletionMessageParam[] =>
  messages.map((message) => ({
    role: message?.user?.role === "user" ? "user" : "system",
    content: message.text ?? "",
  }));
