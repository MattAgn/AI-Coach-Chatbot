import { useEffect, useState } from "react";

import { getChatClient } from "~/utils/chatClient";
import { useUser } from "~/utils/user";

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);
  const { userId } = useUser();

  useEffect(() => {
    if (!userId) {
      return;
    }

    const setupClient = async () => {
      try {
        // If the chat client has a value in the field `userID`, a user is already connected
        // and we can skip trying to connect the user again.
        const chatClient = getChatClient();
        if (!chatClient.userID) {
          await chatClient.connectUser(
            { id: userId, name: "Toto" },
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

    void setupClient();
  }, [userId]);

  return {
    clientIsReady,
  };
};
