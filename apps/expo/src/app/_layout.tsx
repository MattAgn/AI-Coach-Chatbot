import "@bacons/text-decoder/install";

import type { DeepPartial, Theme } from "stream-chat-expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";

import { TRPCProvider } from "~/utils/api";
import { chatApiKey } from "../chatConfig";
import { ChatProvider } from "./ChatContext";

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
              <Slot />
              <StatusBar />
            </Chat>
          </OverlayProvider>
        </GestureHandlerRootView>
      </ChatProvider>
    </TRPCProvider>
  );
}
