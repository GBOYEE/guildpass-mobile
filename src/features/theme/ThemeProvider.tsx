import React from "react";
import { View } from "react-native";
import { useTheme } from "./useTheme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { isDark } = useTheme();

  return (
    <View className={`flex-1 ${isDark ? "bg-dark-background" : "bg-background"}`}>
      {children}
    </View>
  );
}
