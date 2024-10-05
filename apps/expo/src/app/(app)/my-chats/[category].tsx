import type { Channel } from "stream-chat";
import { Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ChannelList, generateRandomId } from "stream-chat-expo";

import type { Category } from "~/utils/coachByCategory";
import { Loader } from "~/components/Loader";
import { NewChatButton } from "~/components/NewChatButton";
import { getChatClient } from "~/utils/chatClient";
import { coachByCategory } from "~/utils/coachByCategory";
import { DEFAULT_CHAT_NAME } from "~/utils/defaultChatTitle";
import { getUserId } from "~/utils/User";
import { useChat } from "../../ChatContext";

export default function MyChats() {
  const { setChannel, clientIsReady } = useChat();
  const { category } = useLocalSearchParams();
  const userId = getUserId();

  if (typeof category !== "string") {
    throw new Error("Category must be a string");
  }
  if (!userId) {
    throw new Error("User not found");
  }

  const filter = {
    type: category,
    members: { $in: [userId] },
  };

  const startNewChat = async () => {
    try {
      const channelId = `${category}-${generateRandomId()}`;

      const channel = getChatClient().channel(category, channelId, {
        name: DEFAULT_CHAT_NAME,
      });

      const coachId = coachByCategory[category as Category];

      if (!coachId) {
        throw new Error("Coach not found");
      }
      if (!userId) {
        throw new Error("User not found");
      }
      await channel.create();
      await channel.addMembers([coachId, userId]);
      setChannel(channel);
      router.navigate({
        pathname: "/chat/[name]",
        params: { name: DEFAULT_CHAT_NAME },
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to start a new chat");
    }
  };

  const handleChannelSelect = (channel: Channel) => {
    setChannel(channel);
    const chatName = channel.data?.name ?? DEFAULT_CHAT_NAME;
    router.navigate({
      pathname: "/chat/[name]",
      params: { name: chatName },
    });
  };

  if (!clientIsReady) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container} edges={["left", "bottom", "right"]}>
      <Stack.Screen
        options={{
          title: category,
          headerBackTitleVisible: false,
        }}
      />
      <ChannelList
        filters={filter}
        ListHeaderComponent={() => null}
        LoadingIndicator={Loader}
        onSelect={handleChannelSelect}
      />
      <NewChatButton onPress={() => startNewChat()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
