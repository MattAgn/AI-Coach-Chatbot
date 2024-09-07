import type { Dispatch, ReactNode, SetStateAction } from "react";
import React, { useState } from "react";

interface ChatContextType {
  channel: string | null;
  setChannel: Dispatch<SetStateAction<string | null>>;
  thread: string | null;
  setThread: Dispatch<SetStateAction<string | null>>;
}

export const ChatContext = React.createContext<ChatContextType>({
  channel: "gpt",
  setChannel: () => {},
  thread: null,
  setThread: () => {},
});

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [channel, setChannel] = useState<string | null>(null);
  const [thread, setThread] = useState<string | null>(null);

  return (
    <ChatContext.Provider value={{ channel, setChannel, thread, setThread }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => React.useContext(ChatContext);
