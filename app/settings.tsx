import { View, Text, ScrollView, Pressable } from "react-native";
import { useWallet } from "../src/features/wallet/useWallet";
import { AppHeader } from "../src/components/AppHeader";
import { Card } from "../src/components/Card";
import { Button } from "../src/components/Button";
import { WalletRequired } from "../src/components/WalletRequired";
import { appConfig } from "../src/config/appConfig";
import { resetAppState } from "../src/lib/resetAppState";
import { useTheme, ThemePreference } from "../src/features/theme";
import React, { useState } from "react";

const themeOptions: { value: ThemePreference; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export default function Settings() {
  const { isConnected } = useWallet();
  const { preference, setPreference, isDark } = useTheme();
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = async () => {
    setIsResetting(true);
    try {
      await resetAppState();
    } finally {
      setIsResetting(false);
    }
  };

  const apiUrl = appConfig.apiUrl;
  const chainId = appConfig.chainId;

  return (
    <WalletRequired>
      <View
        className={`flex-1 ${isDark ? "bg-dark-background" : "bg-background"}`}
        testID="settings-screen"
      >
        <AppHeader title="Settings" showBack />
        <ScrollView className="flex-1 px-4 py-6">
          <Text
            className={`text-lg font-bold mb-3 ${isDark ? "text-dark-text" : "text-text"}`}
          >
            Appearance
          </Text>
          <Card className={`mb-6 ${isDark ? "bg-dark-card border-dark-border" : ""}`}>
            <View className="flex-row justify-between items-center">
              {themeOptions.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => setPreference(option.value)}
                  className={`flex-1 py-3 rounded-lg mx-1 items-center ${
                    preference === option.value
                      ? "bg-primary"
                      : isDark
                        ? "bg-dark-border"
                        : "bg-border"
                  }`}
                  testID={`theme-option-${option.value}`}
                >
                  <Text
                    className={`font-medium ${
                      preference === option.value
                        ? "text-white"
                        : isDark
                          ? "text-dark-text"
                          : "text-text"
                    }`}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Card>

          <Text
            className={`text-lg font-bold mb-3 ${isDark ? "text-dark-text" : "text-text"}`}
          >
            Protocol Configuration
          </Text>
          <Card className={`mb-6 ${isDark ? "bg-dark-card border-dark-border" : ""}`}>
            <View
              className={`flex-row justify-between py-2 border-b ${isDark ? "border-dark-border" : "border-border"}`}
            >
              <Text className={isDark ? "text-dark-text-muted" : "text-text-muted"}>
                API URL
              </Text>
              <Text
                className={`font-medium ${isDark ? "text-dark-text" : "text-text"}`}
                testID="settings-api-url"
              >
                {apiUrl}
              </Text>
            </View>
            <View
              className={`flex-row justify-between py-2 border-b ${isDark ? "border-dark-border" : "border-border"}`}
            >
              <Text className={isDark ? "text-dark-text-muted" : "text-text-muted"}>
                Default Chain ID
              </Text>
              <Text
                className={`font-medium ${isDark ? "text-dark-text" : "text-text"}`}
                testID="settings-chain-id"
              >
                {chainId}
              </Text>
            </View>
            <View className="flex-row justify-between py-2">
              <Text className={isDark ? "text-dark-text-muted" : "text-text-muted"}>
                SDK Version
              </Text>
              <Text
                className={`font-medium ${isDark ? "text-dark-text" : "text-text"}`}
                testID="settings-sdk-version"
              >
                0.1.0-mvp
              </Text>
            </View>
          </Card>

          <Text
            className={`text-lg font-bold mb-3 ${isDark ? "text-dark-text" : "text-text"}`}
          >
            Account
          </Text>
          <Card className={`mb-8 ${isDark ? "bg-dark-card border-dark-border" : ""}`}>
            <WalletRequired redirect={false}>
              <Text className={`mb-4 ${isDark ? "text-dark-text-muted" : "text-text-muted"}`}>
                will disconnect your current wallet address and clear any local cache.
              </Text>
              <Button
                title="Reset App State"
                onPress={handleReset}
                variant="danger"
                loading={isResetting}
                disabled={isResetting}
              />
            </WalletRequired>
          </Card>

          <View className="items-center mt-12">
            <Text
              className={`text-sm italic ${isDark ? "text-dark-text-muted" : "text-text-muted"}`}
            >
              GuildPass Mobile MVP v1.0.0
            </Text>
            <Text
              className={`text-xs mt-1 ${isDark ? "text-dark-text-muted" : "text-text-muted"}`}
            >
              Built with Expo and NativeWind
            </Text>
          </View>
        </ScrollView>
      </View>
    </WalletRequired>
  );
}
