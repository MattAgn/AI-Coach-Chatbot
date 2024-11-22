import { StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { GradientBackground } from "~/view/components/GradientBackground";

export default function MentalHealth() {
  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Stack.Screen />
        <View className="h-full w-full p-4">
          <Animated.Text entering={FadeIn.duration(800)} style={styles.title}>
            Mental Health
          </Animated.Text>
        </View>
      </SafeAreaView>
    </GradientBackground>
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
