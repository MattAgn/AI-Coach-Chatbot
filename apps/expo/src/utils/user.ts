import { useEffect, useState } from "react";
import { MMKV } from "react-native-mmkv";
import { generateRandomId } from "stream-chat-expo";

const storage = new MMKV();

export const useUser = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = storage.getString("userId");

    if (storedId) {
      console.log("Found stored user ID:", storedId);
      setUserId(storedId);
    } else {
      const newId = generateRandomId();
      storage.set("userId", newId);
      setUserId(newId);
      console.log("No stored user ID found, generating a new one", newId);
    }
  }, []);

  return { userId };
};
