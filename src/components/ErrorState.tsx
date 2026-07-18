import { View, Text } from "react-native";
import React from "react";
import { Button } from "./Button";
import { useTheme } from "../features/theme";

type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  const { isDark } = useTheme();
  const bgClass = isDark ? "bg-dark-background" : "bg-background";
  const mutedTextClass = isDark ? "text-dark-text-muted" : "text-text-muted";

  return (
    <View className={`flex-1 justify-center items-center p-6 ${bgClass}`}>
      <Text className="text-error text-xl font-bold text-center mb-2">Something went wrong</Text>
      <Text className={`text-center mb-6 ${mutedTextClass}`}>{message}</Text>
      {onRetry && <Button title="Try Again" onPress={onRetry} variant="outline" />}
    </View>
  );
};
