import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const TYPING_SPEED = 120;
const BUBBLE_SIZE = 15;

export const AnimatedTypingTitle = ({ title }: { title: string }) => {
  const [displayedTitle, setDisplayedTitle] = useState("");
  const bubbleScale = useSharedValue(1);
  const bubbleOpacity = useSharedValue(1);

  const bubbleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: bubbleScale.value }],
      opacity: bubbleOpacity.value,
    };
  });

  useEffect(() => {
    let currentIndex = 0;
    bubbleOpacity.value = 1;
    setDisplayedTitle("");

    const intervalId = setInterval(() => {
      if (currentIndex < title.length) {
        setDisplayedTitle((prev) => prev + title[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
        bubbleScale.value = 1;
        bubbleOpacity.value = 0;
      }
    }, TYPING_SPEED);

    bubbleScale.value = withRepeat(
      withTiming(1.3, { duration: 700, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
    bubbleOpacity.value = withRepeat(
      withTiming(0.3, { duration: 700, easing: Easing.inOut(Easing.ease) }), // Opacité réduite à 0.6
      -1,
      true,
    );

    return () => {
      clearInterval(intervalId);
      bubbleScale.value = 1;
      bubbleOpacity.value = 0;
    };
  }, [title]);

  return (
    <Text style={styles.title}>
      {displayedTitle}{" "}
      {displayedTitle.length < title.length ? (
        <Animated.View style={[styles.bubble, bubbleStyle]} />
      ) : null}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
  },
  bubble: {
    alignSelf: "center",
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    backgroundColor: "#6C63FF",
    borderRadius: BUBBLE_SIZE / 2,
  },
});
