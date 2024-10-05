import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { generateRandomId } from "stream-chat-expo";

import { storage } from "../../utils/storage";

interface UserContextType {
  userId: string | null;
  userName: string | null;
  signUp: (name: string) => void;
  signOut: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const signUp = (name: string) => {
    console.log("sign in");
    const newId = generateRandomId();
    storage.set("userId", newId);
    storage.set("userName", name);
    setUserId(newId);
    setUserName(name);
  };

  const signOut = () => {
    storage.delete("userId");
    storage.delete("userName");
    setUserId(null);
    setUserName(null);
  };

  const getUserId = () => storage.getString("userId");
  const getUserName = () => storage.getString("userName");

  useEffect(() => {
    const storedUserId = getUserId();
    const storedUserName = getUserName();
    if (storedUserId && storedUserName) {
      setUserId(storedUserId);
      setUserName(storedUserName);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userId, userName, signUp, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
