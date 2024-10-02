import { Redirect, Stack } from "expo-router";

import { getUserId, getUserName } from "~/utils/User";

export default function AppLayout() {
  const isLoggedIn = getUserId() !== undefined && getUserName() !== undefined;

  if (!isLoggedIn) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack />;
}
