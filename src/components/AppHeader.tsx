import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useTheme } from "../features/theme";

type AppHeaderProps = {
  title: string;
  showBack?: boolean;
};

export const AppHeader = ({ title, showBack = false }: AppHeaderProps) => {
  const router = useRouter();
  const { isDark } = useTheme();

  return (
    <SafeAreaView
      className={`border-b ${isDark ? "bg-dark-card border-dark-border" : "bg-white border-border"}`}
    >
      <View className="flex-row items-center px-4 py-3">
        {showBack && (
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-4 p-2"
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text className="text-primary text-2xl font-bold">←</Text>
          </TouchableOpacity>
        )}
        <Text
          className={`text-xl font-bold flex-1 ${isDark ? "text-dark-text" : "text-text"}`}
        >
          {title}
        </Text>
      </View>
    </SafeAreaView>
  );
};
