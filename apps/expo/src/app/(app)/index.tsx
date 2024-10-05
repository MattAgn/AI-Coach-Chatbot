import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router, Stack } from "expo-router";

import { getChatClient } from "~/utils/chatClient";
import { Categories } from "~/view/components/Categories";
import { useUser } from "~/view/contexts/UserContext";
import { useChat } from "../../view/contexts/ChatContext";

export default function Index() {
  const { setupClient } = useChat();
  const { userName, signOut } = useUser();

  const resetUser = () => {
    signOut();
    getChatClient().disconnectUser();
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
            <Animated.Text entering={FadeIn.duration(800)} style={styles.title}>
              Hello {userName}
            </Animated.Text>
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
