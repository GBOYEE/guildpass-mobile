import { View, Text } from "react-native";
import React from "react";
import { Button } from "./Button";
import { useTheme } from "../features/theme";

type EmptyStateProps = {
  title: string;
  message: string;
  actionTitle?: string;
  onAction?: () => void;
};

export const EmptyState = ({ title, message, actionTitle, onAction }: EmptyStateProps) => {
  const { isDark } = useTheme();
  const bgClass = isDark ? "bg-dark-background" : "bg-background";
  const textClass = isDark ? "text-dark-text" : "text-text";
  const mutedTextClass = isDark ? "text-dark-text-muted" : "text-text-muted";

  return (
    <View className={`flex-1 justify-center items-center p-6 ${bgClass}`}>
      <View className="w-20 h-20 bg-text-muted/10 rounded-full items-center justify-center mb-6">
        <Text className={`text-4xl ${mutedTextClass}`}>∅</Text>
      </View>
      <Text className={`text-2xl font-bold text-center mb-2 ${textClass}`}>{title}</Text>
      <Text className={`text-center mb-8 ${mutedTextClass}`}>{message}</Text>
      {actionTitle && onAction && (
        <Button title={actionTitle} onPress={onAction} variant="outline" />
      )}
    </View>
  );
};
