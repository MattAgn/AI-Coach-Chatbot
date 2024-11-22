import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import { GradientBackground } from "~/view/components/GradientBackground";

export default function MentalHealth() {
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    if (isRecording) {
      console.log("stop recording");
    } else {
      console.log("start recording");
    }
    setIsRecording((prev) => !prev);
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Stack.Screen />
        <View style={{ flexGrow: 1 }}>
          <Animated.Text entering={FadeIn.duration(800)} style={styles.title}>
            Mental Health
          </Animated.Text>
          <View
            style={{
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            <TouchableOpacity
              onPress={toggleRecording}
              style={styles.recordingButton}
            >
              <Ionicons
                name={isRecording ? "square" : "mic"}
                size={BUTTON_SIZE - 30}
                color={isRecording ? "red" : "black"}
                style={{ alignSelf: "center", justifyContent: "center" }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const BUTTON_SIZE = 90;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 23,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  recordingButton: {
    backgroundColor: "white",
    borderRadius: BUTTON_SIZE / 2,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    alignSelf: "center",
    justifyContent: "center",
  },
});
