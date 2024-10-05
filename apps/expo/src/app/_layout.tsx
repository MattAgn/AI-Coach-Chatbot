import "@bacons/text-decoder/install";

import type { DeepPartial, Theme } from "stream-chat-expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";

import { TRPCProvider } from "~/utils/api";
import { GradientBackground } from "~/view/components/GradientBackground";
import { UserProvider } from "~/view/contexts/UserContext";
import { chatApiKey } from "../chatConfig";
import { ChatProvider } from "../view/contexts/ChatContext";

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
      <UserProvider>
        <ChatProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <OverlayProvider value={{ style: theme }}>
              <GradientBackground>
                <Chat client={chatClient}>
                  <Slot />
                  <StatusBar />
                </Chat>
              </GradientBackground>
            </OverlayProvider>
          </GestureHandlerRootView>
        </ChatProvider>
      </UserProvider>
    </TRPCProvider>
  );
}
