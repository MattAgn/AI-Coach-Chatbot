import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";

import { MyChats } from "~/components/MyChats";
import { useChatClient } from "./useChatClient";

export default function Index() {
  const { clientIsReady } = useChatClient();

  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>;
  }

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <SafeAreaView>
        <Stack.Screen options={{ header: () => null }} />
        <View className="h-full w-full p-4">
          <Text style={styles.title}>Everyday wellness coaching</Text>
          <MyChats />
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
