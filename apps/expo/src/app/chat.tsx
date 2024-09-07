import { SafeAreaView } from "react-native-safe-area-context";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";

import { useChat } from "./ChatContext";

export default function Chat() {
  const { channel } = useChat();
  if (!channel) {
    return null;
  }

  return (
    <SafeAreaView className="bg-background">
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </SafeAreaView>
  );
}
