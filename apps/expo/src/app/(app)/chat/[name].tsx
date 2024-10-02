import type { Event } from "stream-chat";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";

import type { Category } from "~/utils/coachByCategory";
import { AnimatedTypingTitle } from "~/components/AnimatedTypingTitle";
import { api } from "~/utils/api";
import { getChatClient } from "~/utils/chatClient";
import { DEFAULT_CHAT_NAME } from "~/utils/defaultChatTitle";
import { useChat } from "../../ChatContext";

export default function Chat() {
  const { name } = useLocalSearchParams();
  const { channel } = useChat();
  const defaultChatName = typeof name === "string" ? name : DEFAULT_CHAT_NAME;
  const [pageTitle, setPageTitle] = useState(defaultChatName);

  const respondToMessage = api.chatbot.getChatGptResponse.useMutation();

  useEffect(() => {
    const handleNewMessage = async (event: Event) => {
      try {
        const userRole = event.message?.user?.role;
        const channelId = event.channel_id!;
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
