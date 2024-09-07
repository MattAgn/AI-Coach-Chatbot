import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";

import { useChat } from "./ChatContext";

export default function Chat() {
  const { channel } = useChat();
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
