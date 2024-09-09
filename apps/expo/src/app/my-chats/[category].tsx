import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router, Stack, useLocalSearchParams } from "expo-router";
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
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <SafeAreaView>
        <Stack.Screen
          options={{
            title: category,
            headerTransparent: true,
            headerTintColor: "white",
          }}
        />
        <View className="h-full w-full p-4">
          <TouchableOpacity
            onPress={() => {
              console.log("coucou");
              startNewChat();
            }}
          >
            <Text style={styles.buttonNewChat}>New chat</Text>
          </TouchableOpacity>
          <ChannelList
            filters={filter}
            LoadingIndicator={Loader}
            // Preview={CustomChannelPreview}
            onSelect={(channel) => {
              setChannel(channel);
              router.navigate("/chat");
            }}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonNewChat: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 70,
    marginBottom: 30,
    padding: 10,
    color: "white",
  },
});
