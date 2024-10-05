import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Channel } from "stream-chat";
import React, { useState } from "react";

import { getChatClient } from "~/utils/chatClient";
import { getUserId, getUserName } from "~/utils/User";

interface ChatContextType {
  channel: Channel | null;
  setChannel: Dispatch<Channel | null>;
  thread: string | null;
  setThread: Dispatch<SetStateAction<string | null>>;
  clientIsReady: boolean;
  setupClient: () => Promise<void>;
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
  clientIsReady: false,
  setupClient: () => {
    throw new Error("setupClient function must be overridden");
  },
});

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [thread, setThread] = useState<string | null>(null);

  const [clientIsReady, setClientIsReady] = useState(false);

  const setupClient = async () => {
    const userId = getUserId();
    const userName = getUserName();
    if (!userId || !userName) {
      return;
    }

    try {
      // If the chat client has a value in the field `userID`, a user is already connected
      // and we can skip trying to connect the user again.
      const chatClient = getChatClient();
      if (!chatClient.userID) {
        await chatClient.connectUser(
          { id: userId, name: userName },
          chatClient.devToken(userId),
        );
      }
      setClientIsReady(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          `An error occurred while connecting the user: ${error.message}`,
        );
      }
    }
  };

  return (
    <ChatContext.Provider
      value={{
        channel,
        setChannel,
        thread,
        setThread,
        setupClient,
        clientIsReady,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => React.useContext(ChatContext);
