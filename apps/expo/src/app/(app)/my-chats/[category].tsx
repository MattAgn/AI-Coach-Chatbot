import type { Channel } from "stream-chat";
import { Alert, StyleSheet, Text, View } from "react-native";
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
  console.log({ userId });
  console.log({ category });
  console.log({ clientIsReady });

  if (typeof category !== "string") {
    throw new Error("Category must be a string");
  }
  if (!userId) {
    throw new Error("User not found");
  }

  const filter = {
    type: category,
    members: { $in: [userId] },
    last_message_at: { $exists: true },
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
      <View className="h-full w-full">
        <ChannelList
          filters={filter}
          ListHeaderComponent={() => null}
          LoadingIndicator={Loader}
          onSelect={handleChannelSelect}
        />
        <NewChatButton onPress={() => startNewChat()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonNewChatText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  buttonNewChatContainer: {
    backgroundColor: "#6a29d3",
    borderRadius: 30,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    width: 200,
    padding: 10,
    position: "absolute",
    bottom: 20,
    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,

    // Android Shadow (elevation)
    elevation: 5,
  },
});
