import { ActivityIndicator, View } from "react-native";

export const Loader = () => {
  return (
    <View style={{ justifyContent: "center", flex: 1 }}>
      <ActivityIndicator color={"white"} size={"large"} />
    </View>
  );
};
