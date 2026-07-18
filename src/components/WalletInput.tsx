import { View, Text, TextInput } from "react-native";
import React from "react";
import { useTheme } from "../features/theme";

type WalletInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string | null;
  testID?: string;
};

export const WalletInput = ({
  value,
  onChangeText,
  placeholder = "0x...",
  error = null,
  testID,
}: WalletInputProps) => {
  const { isDark } = useTheme();
  const mutedTextClass = isDark ? "text-dark-text-muted" : "text-text-muted";
  const inputBgClass = isDark ? "bg-dark-card" : "bg-white";
  const borderClass = error
    ? "border-error"
    : isDark
      ? "border-dark-border"
      : "border-border";
  const textClass = isDark ? "text-dark-text" : "text-text";

  return (
    <View className="w-full">
      <Text className={`mb-2 font-medium ${mutedTextClass}`}>Wallet Address</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDark ? "#94a3b8" : "#64748b"}
        accessibilityLabel="Wallet Address"
        accessibilityHint="Enter your wallet address starting with 0x"
        testID={testID}
        className={`border rounded-xl p-4 text-lg ${inputBgClass} ${borderClass} ${textClass}`}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {error && (
        <Text className="text-error mt-2 text-sm" accessibilityRole="alert">
          {error}
        </Text>
      )}
    </View>
  );
};
