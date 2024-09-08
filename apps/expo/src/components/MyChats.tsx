import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
    <TouchableOpacity style={styles.card} onPress={() => {}}>
      <Text style={styles.channelName}>{category}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    marginBottom: 20,
    borderRadius: 30,
    backgroundColor: "#d9c2ff",
    padding: 50,
  },
  channelName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
