import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";

import { Categories } from "~/components/MyChats";

export default function Index() {
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
          <Text style={styles.title}>Everyday wellness coaching</Text>
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
