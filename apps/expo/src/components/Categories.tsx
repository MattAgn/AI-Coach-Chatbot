import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from "expo-router";

export const Categories = () => {
  return (
    <View>
      <CategoryCard
        category="Sleep"
        imagePath={require("../../assets/Sleep.png")}
      />
      <CategoryCard
        category="Nutrition"
        imagePath={require("../../assets/Nutrition.png")}
      />
      <CategoryCard
        category="Sport"
        imagePath={require("../../assets/Sport.png")}
      />
    </View>
  );
};

const CategoryCard = ({
  category,
  imagePath,
}: {
  category: string;
  imagePath: ImageSourcePropType;
}) => {
  return (
    <Link
      href={{
        pathname: "/my-chats/[category]",
        params: { category },
      }}
      asChild
    >
      <TouchableOpacity style={styles.card}>
        <Image source={imagePath} style={styles.image} />
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#d9c2ff",
    marginBottom: 20,
    borderRadius: 30,
    flexDirection: "row",
    gap: 30,
    width: "100%",
    height: 150,
    overflow: "hidden",
  },
  channelName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
