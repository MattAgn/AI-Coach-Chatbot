import "@bacons/text-decoder/install";

import type { DeepPartial, Theme } from "stream-chat-expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Chat, OverlayProvider } from "stream-chat-expo";

import { TRPCProvider } from "~/utils/api";
import { chatApiKey } from "../chatConfig";
import { ChatProvider } from "./ChatContext";

import "../styles.css";

import { StreamChat } from "stream-chat";

const theme: DeepPartial<Theme> = {
  channelListMessenger: {
    flatList: {
      backgroundColor: "transparent",
    },
    flatListContent: {
      backgroundColor: "transparent",
    },
  },
};

const chatClient = StreamChat.getInstance(chatApiKey);

export default function RootLayout() {
  return (
    <TRPCProvider>
      <ChatProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <OverlayProvider value={{ style: theme }}>
            <Chat client={chatClient}>
              <Stack />
              <StatusBar />
            </Chat>
          </OverlayProvider>
        </GestureHandlerRootView>
      </ChatProvider>
    </TRPCProvider>
  );
}
