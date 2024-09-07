import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Channel } from "stream-chat";
import React, { useState } from "react";

interface ChatContextType {
  channel: Channel | null;
  setChannel: Dispatch<Channel | null>;
  thread: string | null;
  setThread: Dispatch<SetStateAction<string | null>>;
}

export const ChatContext = React.createContext<ChatContextType>({
  channel: null,
  setChannel: () => {
    throw new Error("setChannel function must be overridden");
  },
  thread: null,
  setThread: () => {
    throw new Error("setThread function must be overridden");
  },
});

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [thread, setThread] = useState<string | null>(null);

  return (
    <ChatContext.Provider value={{ channel, setChannel, thread, setThread }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => React.useContext(ChatContext);
