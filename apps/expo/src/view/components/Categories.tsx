import { View } from "react-native";

import { CategoryCard } from "./CategoryCard";

export const Categories = () => {
  return (
    <View>
      <CategoryCard
        category="Sleep"
        imagePath={require("../../../assets/Sleep.png")}
        index={0}
      />
      <CategoryCard
        category="Sport"
        imagePath={require("../../../assets/Sport.png")}
        index={1}
      />
      <CategoryCard
        category="Nutrition"
        imagePath={require("../../../assets/Nutrition.png")}
        index={2}
      />
    </View>
  );
};
