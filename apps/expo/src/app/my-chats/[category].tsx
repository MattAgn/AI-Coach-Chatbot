import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Channel } from "stream-chat";
import { ChannelList, generateRandomId } from "stream-chat-expo";

import { chatUserId } from "~/chatConfig";
import { Loader } from "~/components/Loader";
import { NewChatButton } from "~/components/NewChatButton";
import { getChatClient } from "~/utils/chatClient";
import { Category, coachByCategory } from "~/utils/coachByCategory";
import { useChat } from "../ChatContext";
import { useChatClient } from "../useChatClient";

export default function MyChats() {
  const { setChannel } = useChat();
  const { category } = useLocalSearchParams();
  const { clientIsReady } = useChatClient();

  if (typeof category !== "string") {
    throw new Error("Category must be a string");
  }

  const filter = {
    type: category,
    members: { $in: [chatUserId] },
    last_message_at: { $exists: true },
  };

  const startNewChat = async () => {
    try {
      const channelId = `${category}-${generateRandomId()}`;

      const channel = getChatClient().channel(category, channelId, {
        name: "NO_NAME",
      });

      const coachId = coachByCategory[category as Category];

      if (!coachId) {
        throw new Error("Coach not found");
      }
      await channel.create();
      await channel.addMembers([coachId, chatUserId]);
      setChannel(channel);
      router.navigate("/chat/Chat");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to start a new chat");
    }
  };

  const handleChannelSelect = (channel: Channel) => {
    setChannel(channel);
    const chatName = channel.data?.name ?? "Chat";
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
