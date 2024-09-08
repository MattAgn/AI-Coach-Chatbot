import { Button, StyleSheet, Text, Touchable, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams } from "expo-router";

import { chatUserId } from "~/chatConfig";
import { getChatClient } from "~/utils/chatClient";
import { Category, coachByCategory } from "~/utils/coachByCategory";

export default function MyChats() {
  const { category } = useLocalSearchParams();
  if (typeof category !== "string") {
    throw new Error("Category must be a string");
  }

  const startNewChat = async () => {
    try {
      if (!getChatClient().userID) {
        await getChatClient().connectUser(
          { id: chatUserId },
          getChatClient().devToken(chatUserId),
        );
      }

      const channel = getChatClient().channel(category, "1", {
        name: `${category} chat 1`,
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

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <SafeAreaView>
        <Stack.Screen options={{ header: () => null }} />
        <View className="h-full w-full p-4">
          <Text style={styles.title}>{category}</Text>
          <TouchableOpacity onPress={() => startNewChat()}>
            <Text style={styles.title}>New chat</Text>
          </TouchableOpacity>
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
