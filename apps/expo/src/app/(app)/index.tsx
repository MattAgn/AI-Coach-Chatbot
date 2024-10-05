import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router, Stack } from "expo-router";

import { Categories } from "~/components/Categories";
import { getChatClient } from "~/utils/chatClient";
import { getUserName, signOut } from "~/utils/User";
import { useChat } from "../ChatContext";

export default function Index() {
  const { setupClient } = useChat();
  const userName = getUserName();

  const resetUser = () => {
    signOut();
    getChatClient()
      .disconnectUser()
      .then(() => {
        router.replace("/sign-up");
      })
      .catch((e) => console.error("Failed disconnecting user", e));
  };

  useEffect(() => {
    void setupClient();
  }, []);

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <SafeAreaView>
        <Stack.Screen
          options={{
            header: () => null,
            title: "Home",
          }}
        />
        <View className="h-full w-full p-4">
          <TouchableOpacity onLongPress={resetUser}>
            <Text style={styles.title}>Hello {userName}</Text>
          </TouchableOpacity>
          <Categories />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 23,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 40,
    color: "white",
  },
});
