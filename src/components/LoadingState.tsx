import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useTheme } from "../features/theme";

export const LoadingState = ({ message = "Loading..." }: { message?: string }) => {
  const { isDark } = useTheme();
  const bgClass = isDark ? "bg-dark-background" : "bg-background";
  const mutedTextClass = isDark ? "text-dark-text-muted" : "text-text-muted";

  return (
    <View className={`flex-1 justify-center items-center p-6 ${bgClass}`}>
      <ActivityIndicator size="large" color="#6366f1" />
      <Text className={`mt-4 text-lg ${mutedTextClass}`}>{message}</Text>
    </View>
  );
};
