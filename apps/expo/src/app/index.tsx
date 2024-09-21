import { Alert, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";

import { Categories } from "~/components/Categories";
import { getChatClient } from "~/utils/chatClient";
import { storage } from "~/utils/storage";

export default function Index() {
  const resetUser = () => {
    storage.delete("userId");
    getChatClient().disconnectUser();
    Alert.alert("User reset and disconnected from chat");
  };

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
            <Text style={styles.title}>AI Coaching</Text>
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
