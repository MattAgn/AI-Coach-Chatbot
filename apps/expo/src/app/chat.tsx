import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { ChannelId } from "node_modules/@acme/api/dist/router/chatbot";
import { Event, StreamChat } from "stream-chat";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";

import { chatApiKey } from "~/chatConfig";
import { api } from "~/utils/api";
import { useChat } from "./ChatContext";

const chatClient = StreamChat.getInstance(chatApiKey);

export default function Chat() {
  const { channel } = useChat();

  const respondToMessage = api.chatbot.getChatGptResponse.useMutation();

  useEffect(() => {
    const handleNewMessage = async (event: Event) => {
      try {
        const userRole = event?.message?.user?.role;
        const channelType = event?.channel_type;
        const channelId = event.channel_id as ChannelId;
        const message = event?.message?.text;

        if (
          event.type !== "message.new" ||
          userRole === "speaker" ||
          !message ||
          !channelType ||
          !channelId
        ) {
          return;
        }

        respondToMessage.mutateAsync({ channelId });
      } catch (error) {
        console.log(error);
      }
    };

    chatClient.on("message.new", handleNewMessage);

    return () => {
      chatClient.off("message.new", handleNewMessage);
    };
  }, [chatClient, respondToMessage]);

  if (!channel) {
    return null;
  }

  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen
        options={{
          title: channel.data?.name ?? "Chat",
        }}
      />
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </SafeAreaView>
  );
}
