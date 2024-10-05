import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const Button = ({
  onPress,
  title,
}: {
  onPress: () => void;
  title: string;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonNewChatContainer}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
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
