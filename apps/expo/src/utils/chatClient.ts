import { StreamChat } from "stream-chat";

import { chatApiKey } from "~/chatConfig";

export const getChatClient = () => {
  const STREAM_API_KEY = chatApiKey;

  return StreamChat.getInstance(STREAM_API_KEY);
};
