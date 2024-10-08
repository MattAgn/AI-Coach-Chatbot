import { StreamChat } from "stream-chat";

const STREAM_API_KEY = process.env.STREAM_API_KEY;
const STREAM_SECRET = process.env.STREAM_SECRET;

export const getChatClient = () => {
  if (!STREAM_API_KEY || !STREAM_SECRET) {
    throw new Error("STREAM_API_KEY and STREAM_SECRET are required");
  }

  return StreamChat.getInstance(STREAM_API_KEY, STREAM_SECRET);
};
