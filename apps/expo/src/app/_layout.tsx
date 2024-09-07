import "@bacons/text-decoder/install";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { Chat, OverlayProvider } from "stream-chat-expo";

import { TRPCProvider } from "~/utils/api";
import { chatApiKey } from "../chatConfig";
import { ChatProvider } from "./ChatContext";

import "../styles.css";

import { StreamChat } from "stream-chat";

const chatClient = StreamChat.getInstance(chatApiKey);

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <TRPCProvider>
      <ChatProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <OverlayProvider>
            <Chat client={chatClient}>
              <Stack
                screenOptions={{
                  headerStyle: {
                    backgroundColor: "#f472b6",
                  },
                  contentStyle: {
                    backgroundColor:
                      colorScheme == "dark" ? "#09090B" : "#FFFFFF",
                  },
                }}
              />
              <StatusBar />
            </Chat>
          </OverlayProvider>
        </GestureHandlerRootView>
      </ChatProvider>
    </TRPCProvider>
  );
}
