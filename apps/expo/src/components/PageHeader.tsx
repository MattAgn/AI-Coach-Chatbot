import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export const PageHeader = ({ title }: { title: string }) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {router.canGoBack() && (
          <TouchableOpacity onPress={() => router.back()} hitSlop={30}>
            <Text style={{ fontSize: 30, color: "white" }}>{"<"}</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.title}>{title}</Text>
        {router.canGoBack() && <View />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 23,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
});
