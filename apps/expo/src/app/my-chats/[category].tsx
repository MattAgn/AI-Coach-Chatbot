import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Link, Stack, useLocalSearchParams } from "expo-router";

import { useChannelsByCategory } from "~/api/useChannelsByCategory";
import { chatUserId } from "~/chatConfig";
import { getChatClient } from "~/utils/chatClient";
import { Category, coachByCategory } from "~/utils/coachByCategory";
import { useChat } from "../ChatContext";

export default function MyChats() {
  const { setChannel } = useChat();
  const { category } = useLocalSearchParams();
  if (typeof category !== "string") {
    throw new Error("Category must be a string");
  }

  const { data, refetch } = useChannelsByCategory(category as Category);

  const startNewChat = async () => {
    try {
      if (!getChatClient().userID) {
        await getChatClient().connectUser(
          { id: chatUserId },
          getChatClient().devToken(chatUserId),
        );
      }
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
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <SafeAreaView>
        <Stack.Screen />
        <View className="h-full w-full p-4">
          <Text style={styles.title}>{category}</Text>
          <TouchableOpacity onPress={() => startNewChat()}>
            <Text style={styles.title}>New chat</Text>
          </TouchableOpacity>
          {data?.map((channel) => (
            <Link asChild href={"/chat"} key={channel.cid}>
              <TouchableOpacity
                key={channel.cid}
                onPress={() => {
                  console.log(channel.cid);
                  setChannel(channel);
                }}
                style={{ backgroundColor: "white", padding: 10, margin: 5 }}
              >
                <Text>{channel.data?.name}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 23,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 50,
    marginTop: 40,
    color: "white",
  },
});
