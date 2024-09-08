import { useEffect, useState } from "react";

import { getChatClient } from "~/utils/chatClient";
import { chatUserId, chatUserName } from "../chatConfig";

const user = {
  id: chatUserId,
  name: chatUserName,
};

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);

  useEffect(() => {
    const setupClient = async () => {
      try {
        // If the chat client has a value in the field `userID`, a user is already connected
        // and we can skip trying to connect the user again.
        const chatClient = getChatClient();
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
