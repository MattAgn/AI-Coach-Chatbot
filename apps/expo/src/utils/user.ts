import { generateRandomId } from "stream-chat-expo";

import { storage } from "./storage";

export const signIn = (name: string) => {
  console.log("sign in");
  const newId = generateRandomId();
  storage.set("userId", newId);
  storage.set("userName", name);
  console.log("User signed in with id", newId);
  console.log("User signed in with name", name);
};

export const signOut = () => {
  storage.delete("userId");
  storage.delete("userName");
};

export const getUserId = () => storage.getString("userId");
export const getUserName = () => storage.getString("userName");
