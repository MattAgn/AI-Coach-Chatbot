import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";

export const Categories = () => {
  return (
    <View>
      <CategoryCard category="Sleep" />
      <CategoryCard category="Nutrition" />
      <CategoryCard category="Sport" />
    </View>
  );
};

const CategoryCard = ({ category }: { category: string }) => {
  return (
    <Link
      href={{
        pathname: "/my-chats/[category]",
        params: { category },
      }}
      asChild
    >
      <TouchableOpacity style={styles.card}>
        <Text style={styles.channelName}>{category}</Text>
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
    alignItems: "center",
    gap: 30,
    padding: 50,
  },
  channelName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
