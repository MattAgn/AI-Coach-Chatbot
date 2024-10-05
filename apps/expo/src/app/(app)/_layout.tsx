import { Redirect, Stack } from "expo-router";

import { useUser } from "~/view/contexts/UserContext";

export default function AppLayout() {
  const { userId, userName } = useUser();
  const isLoggedIn = userId && userName;

  if (!isLoggedIn) {
    return <Redirect href="/sign-up" />;
  }

  return <Stack />;
}
