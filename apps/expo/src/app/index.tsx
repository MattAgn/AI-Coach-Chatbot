import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { MyChats } from "~/components/MyChats";
import { useChatClient } from "./useChatClient";

export default function Index() {
  const { clientIsReady } = useChatClient();

  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>;
  }

  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen options={{ title: "StreamChatbot" }} />
      <View className="h-full w-full bg-background p-4">
        <Text>Chat with your sleep coach</Text>
        <MyChats />
      </View>
    </SafeAreaView>
  );
}
