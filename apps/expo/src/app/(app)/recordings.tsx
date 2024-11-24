import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { SessionRecording } from "~/domain/sessionRecording";
import { fakeSessionRecordings } from "~/mocks/fakeSessionRecordings";
import { GradientBackground } from "~/view/components/GradientBackground";

export default function Recordings() {
  const renderRecordingCard = ({ item }: { item: SessionRecording }) => {
    return (
      <TouchableOpacity
        onPress={() => console.log(item)}
        style={styles.recordingCard}
      >
        <Text style={{ marginBottom: 10 }}>
          Date {new Date(item.date).toISOString()}
        </Text>
        <Text>{item.summary}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerTitle: "Session recordings" }} />
        <View style={{ justifyContent: "center", flexGrow: 1 }}>
          <FlatList
            data={fakeSessionRecordings}
            keyExtractor={(item) => item.id}
            renderItem={renderRecordingCard}
          />
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 23,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  recordingCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
});
