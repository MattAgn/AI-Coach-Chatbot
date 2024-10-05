import { PropsWithChildren } from "react";
import { LinearGradient } from "expo-linear-gradient";

export const GradientBackground = ({ children }: PropsWithChildren<{}>) => {
  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={{ flex: 1 }}>
      {children}
    </LinearGradient>
  );
};
