import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ChannelList } from "stream-chat-expo";

import { useChannelsByCategory } from "~/api/useChannelsByCategory";
import { chatUserId } from "~/chatConfig";
import { Loader } from "~/components/Loader";
import { getChatClient } from "~/utils/chatClient";
import { Category, coachByCategory } from "~/utils/coachByCategory";
import { useChat } from "../ChatContext";
import { useChatClient } from "../useChatClient";

export default function MyChats() {
  const { setChannel } = useChat();
  const { category } = useLocalSearchParams();
  const { clientIsReady } = useChatClient();
  const { data } = useChannelsByCategory(category as Category);

  if (typeof category !== "string") {
    throw new Error("Category must be a string");
  }

  const filter = { type: category, members: { $in: [chatUserId] } };

  const startNewChat = async () => {
    try {
      const channelId = `${category}-${data?.length ?? 0 + 1}`;
      const channel = getChatClient().channel(category, channelId, {
        name: channelId,
      });

      const coachId = coachByCategory[category as Category];

      if (!coachId) {
        throw new Error("Coach not found");
      }

      await channel.create();
      await channel.addMembers([coachId, chatUserId]);
    } catch (error) {
      console.log(error);
    }
  };

  if (!clientIsReady) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container} edges={{ top: "off" }}>
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
          onSelect={(channel) => {
            setChannel(channel);
            router.navigate("/chat");
          }}
        />
        <TouchableOpacity
          onPress={() => startNewChat()}
          style={styles.buttonNewChatContainer}
        >
          <Ionicons name="add-circle" size={22} color="white" />
          <Text style={styles.buttonNewChatText}>New chat</Text>
        </TouchableOpacity>
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
    margin: 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    width: 200,
    padding: 10,
    position: "absolute",
    bottom: 10,
    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,

    // Android Shadow (elevation)
    elevation: 5, // Works only on Android
  },
});
