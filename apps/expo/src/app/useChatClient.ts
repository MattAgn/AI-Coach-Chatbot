// useChatClient.js

import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";

import { chatApiKey, chatUserId, chatUserName } from "./chatConfig";

const user = {
  id: chatUserId,
  name: chatUserName,
};
const chatClient = StreamChat.getInstance(chatApiKey);

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);

  useEffect(() => {
    const setupClient = async () => {
      try {
        // If the chat client has a value in the field `userID`, a user is already connected
        // and we can skip trying to connect the user again.
        if (!chatClient.userID) {
          await chatClient.connectUser(user, chatClient.devToken(chatUserId));
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

    void setupClient();
  }, []);

  return {
    clientIsReady,
  };
};
