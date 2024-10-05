import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router, Stack } from "expo-router";

import { useUser } from "~/view/contexts/UserContext";
import { useChat } from "../view/contexts/ChatContext";

const ANIMATION_DURATION = 700;

export default function SignUp() {
  const [name, setName] = useState("");
  const { setupClient } = useChat();
  const { signUp } = useUser();

  const { opacity, animatedStyle } = useCardAnimatedStyle();

  const handleSubmit = () => {
    if (name) {
      console.log("wesh");
      signUp(name);
      setupClient()
        .then(() => {
          opacity.value = withTiming(
            0,
            {
              duration: ANIMATION_DURATION,
              easing: Easing.in(Easing.ease),
            },
            () => {
              runOnJS(router.replace)("/");
            },
          );
        })
        .catch((e) => console.error("Failed to setup client", e));
    }
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            header: () => null,
            title: "Sign in",
          }}
        />
        <Animated.View style={[styles.card, animatedStyle]}>
          <Text style={styles.title}>Welcome to AI Coaching</Text>
          <Text style={styles.cardTitle}>How can we call you?</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 23,
    textAlign: "center",
    marginTop: 40,
    fontWeight: "500",
  },
  cardTitle: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 30,
    color: "black",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  card: {
    width: "85%",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 18,
  },
});

function useCardAnimatedStyle() {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.2);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: ANIMATION_DURATION,
      easing: Easing.out(Easing.ease),
    });
    scale.value = withTiming(1, {
      duration: ANIMATION_DURATION,
      easing: Easing.out(Easing.ease),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  return { opacity, scale, animatedStyle };
}
