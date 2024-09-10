import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Event } from "stream-chat";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";

import { api } from "~/utils/api";
import { getChatClient } from "~/utils/chatClient";
import { Category } from "~/utils/coachByCategory";
import { useChat } from "./ChatContext";

export default function Chat() {
  const { channel } = useChat();

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

        respondToMessage.mutateAsync({ channelId, category });
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
    <SafeAreaView className="bg-background" edges={{ top: "off" }}>
      <Stack.Screen options={{ headerBackTitle: "Back", title: "Chat" }} />
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </SafeAreaView>
  );
}
