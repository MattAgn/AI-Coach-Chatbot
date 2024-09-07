import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { OverlayProvider } from "stream-chat-expo";

import { ChatProvider } from "./ChatContext";
import { useChatClient } from "./useChatClient";

export default function Index() {
  const { clientIsReady } = useChatClient();

  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>;
  }

  return (
    <ChatProvider>
      <GestureHandlerRootView>
        <OverlayProvider>
          <SafeAreaView className="bg-background">
            <Stack.Screen options={{ title: "Chatbot" }} />
            <View className="h-full w-full bg-background p-4">
              <Text>Coucou</Text>
            </View>
          </SafeAreaView>
        </OverlayProvider>
      </GestureHandlerRootView>
    </ChatProvider>
  );
}
