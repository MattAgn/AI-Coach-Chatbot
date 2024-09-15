import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import { Event } from "stream-chat";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";

import { AnimatedTypingTitle } from "~/components/AnimatedTypingTitle";
import { api } from "~/utils/api";
import { getChatClient } from "~/utils/chatClient";
import { Category } from "~/utils/coachByCategory";
import { useChat } from "../ChatContext";

export default function Chat() {
  const { name: chatName } = useLocalSearchParams();
  const { channel } = useChat();
  const defaultChatName = typeof chatName === "string" ? chatName : "Chat";
  const [pageTitle, setPageTitle] = useState(defaultChatName);

  const respondToMessage = api.chatbot.getChatGptResponse.useMutation();

  useEffect(() => {
    const handleNewMessage = async (event: Event) => {
      try {
        const userRole = event?.message?.user?.role;
        const channelId = event.channel_id as string;
        const category = event.channel_type as Category;

        if (
          event.type !== "message.new" ||
          userRole === "speaker" ||
          !channelId
        ) {
          return;
        }

        const { newChatName } = await respondToMessage.mutateAsync({
          channelId,
          category,
        });
        if (newChatName) {
          setPageTitle(newChatName);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getChatClient().on("message.new", handleNewMessage);

    return () => {
      getChatClient().off("message.new", handleNewMessage);
    };
  }, [respondToMessage]);

  if (!channel) {
    return null;
  }

  return (
    <SafeAreaView className="bg-background" edges={["left", "bottom", "right"]}>
      <Stack.Screen
        options={{
          headerBackTitle: "Back",
          headerTitle: () => <AnimatedTypingTitle title={pageTitle} />,
        }}
      />
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </SafeAreaView>
  );
}
