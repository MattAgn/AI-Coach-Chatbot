import { useEffect } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { Link } from "expo-router";

export const Categories = () => {
  return (
    <View>
      <CategoryCard
        category="Sleep"
        imagePath={require("../../assets/Sleep.png")}
        index={0}
      />
      <CategoryCard
        category="Sport"
        imagePath={require("../../assets/Sport.png")}
        index={1}
      />
      <CategoryCard
        category="Nutrition"
        imagePath={require("../../assets/Nutrition.png")}
        index={2}
      />
    </View>
  );
};

const CategoryCard = ({
  category,
  imagePath,
  index,
}: {
  category: string;
  imagePath: ImageSourcePropType;
  index: number;
}) => {
  const animatedStyle = useFadeInCardStyle(index);

  return (
    <Link
      href={{
        pathname: "/my-chats/[category]",
        params: { category },
      }}
      asChild
    >
      <TouchableOpacity style={styles.card}>
        <Animated.Image
          source={imagePath}
          style={[styles.image, animatedStyle]}
        />
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "transparent",
    marginBottom: 20,
    borderRadius: 30,
    flexDirection: "row",
    gap: 30,
    width: "100%",
    height: "27%",
    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,

    // Android Shadow (elevation)
    elevation: 3,
  },
  channelName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    borderRadius: 30,
    height: "100%",
  },
});

const useFadeInCardStyle = (index: number) => {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withDelay(
      index * 400,
      withTiming(opacity.value, { duration: 1000 }),
    ),
  }));

  useEffect(() => {
    opacity.value = 1;
  }, []);

  return animatedStyle;
};
