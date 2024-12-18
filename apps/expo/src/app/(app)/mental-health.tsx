import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import { api } from "~/utils/api";
import { GradientBackground } from "~/view/components/GradientBackground";

type AudioTranscription = Array<{ speaker: string; text: string }>;

export default function MentalHealth() {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>();
  const [transcription, setTranscription] = useState<AudioTranscription>();
  const getTranscription = api.voice.getTranscription.useMutation();

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  async function startRecording() {
    try {
      setIsRecording(true);
      setTranscription(undefined);
      const permissionResponse = await Audio.requestPermissionsAsync();

      if (permissionResponse.status === "granted") {
        console.log("Permission granted");
      } else {
        Alert.alert("Permission not granted");
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
      setIsRecording(false);
    }
  }

  async function stopRecording() {
    setIsRecording(false);
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();

    if (!uri) {
      console.error("Failed to get URI for recording");
      return;
    }
    const audioBase64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const { transcript, summary } = await getTranscription.mutateAsync({
      audioBase64,
    });

    console.log({ transcript, summary });

    if (!transcription) {
      setTranscription([{ speaker: "Error", text: "Failed to transcribe" }]);
      return;
    }

    setTranscription(transcription as AudioTranscription);

    setRecording(null);
  }

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerTitle: "Mental Health" }} />
        <View style={{ justifyContent: "center", flexGrow: 1 }}>
          {getTranscription.isPending ? (
            <ActivityIndicator size={"large"} color="white" />
          ) : (
            <TouchableOpacity
              onPress={toggleRecording}
              style={styles.recordingButton}
            >
              <Ionicons
                name={isRecording ? "square" : "mic"}
                size={BUTTON_SIZE - 30}
                color={isRecording ? "red" : "black"}
                style={{ alignSelf: "center", justifyContent: "center" }}
              />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const BUTTON_SIZE = 90;

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
  recordingButton: {
    backgroundColor: "white",
    borderRadius: BUTTON_SIZE / 2,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    alignSelf: "center",
    justifyContent: "center",
  },
});
