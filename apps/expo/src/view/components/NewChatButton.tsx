import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";

const PULSE_ANIMATION_DURATION = 4000;

export const NewChatButton = ({ onPress }: { onPress: () => void }) => {
  const animatedStyle = usePulseAnimationStyle();

  return (
    <Animated.View style={[styles.buttonContainer, animatedStyle]}>
      <TouchableOpacity onPress={onPress} style={styles.buttonNewChatContainer}>
        <Ionicons name="add-circle" size={22} color="white" />
        <Text style={styles.buttonNewChatText}>New chat</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const usePulseAnimationStyle = () => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.04, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1, // Loop indefinitely
      true, // Reverse the animation
    );

    const stopAnimationTimeout = setTimeout(() => {
      cancelAnimation(scale);
      scale.value = withTiming(1, { duration: 500 });
    }, PULSE_ANIMATION_DURATION);

    return () => {
      clearTimeout(stopAnimationTimeout);
      cancelAnimation(scale);
    };
  }, []);

  return animatedStyle;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonNewChatText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  buttonNewChatContainer: {
    backgroundColor: "#6a29d3",
    borderRadius: 30,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    width: 200,
    padding: 10,
    position: "absolute",
    bottom: 20,
    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,

    // Android Shadow (elevation)
    elevation: 5,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
