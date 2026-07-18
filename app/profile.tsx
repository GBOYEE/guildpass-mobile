import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useWallet } from "../src/features/wallet/useWallet";
import { AppHeader } from "../src/components/AppHeader";
import { Card } from "../src/components/Card";
import { WalletInput } from "../src/components/WalletInput";
import { Button } from "../src/components/Button";
import { StaleDataBanner } from "../src/components/StaleDataBanner";
import { useNetworkStatus } from "../src/features/offline/useNetworkStatus";
import { useTheme } from "../src/features/theme";

export default function Profile() {
  const router = useRouter();
  const { walletAddress, isConnected, connectManually, disconnect } = useWallet();
  const { isOffline } = useNetworkStatus();
  const { isDark } = useTheme();
  const [inputValue, setInputValue] = useState(walletAddress || "");
  const [error, setError] = useState<string | null>(null);

  const handleConnect = () => {
    const { success, error: validationError } = connectManually(inputValue);
    if (!success) {
      setError(validationError ?? "Invalid address");
      return;
    }
    setError(null);
    router.push("/guilds");
  };

  const textClass = isDark ? "text-dark-text" : "text-text";
  const mutedTextClass = isDark ? "text-dark-text-muted" : "text-text-muted";

  return (
    <View
      className={`flex-1 ${isDark ? "bg-dark-background" : "bg-background"}`}
      testID="profile-screen"
    >
      <AppHeader title="Profile" />
      <ScrollView className="flex-1 px-4 py-6">
        {isOffline ? <StaleDataBanner reason="offline" /> : null}
        {!isConnected ? (
          <View testID="wallet-connect-form">
            <Text className={`text-2xl font-bold mb-2 ${textClass}`}>Connect Wallet</Text>
            <Text className={`mb-8 ${mutedTextClass}`}>
              address to view your memberships and roles.
            </Text>
            <Card className="mb-8">
              <WalletInput
                value={inputValue}
                onChangeText={(text) => {
                  setInputValue(text);
                  setError(null);
                }}
                error={error}
                testID="wallet-address-input"
              />
              <Button
                title="Continue"
                onPress={handleConnect}
                className="mt-6"
                testID="wallet-connect-button"
              />
            </Card>
          </View>
        ) : (
          <View>
            <Card className="mb-6">
              <Text className={`text-sm mb-1 ${mutedTextClass}`}>CONNECTED WALLET</Text>
              <Text
                className={`text-lg font-bold mb-4 ${textClass}`}
                numberOfLines={1}
                testID="connected-wallet-address"
              >
                {walletAddress}
              </Text>
              <Button
                title="Disconnect"
                onPress={disconnect}
                variant="outline"
                testID="wallet-disconnect-button"
              />
            </Card>

            <View>
              <TouchableOpacity
                onPress={() => router.push("/guilds")}
                activeOpacity={0.7}
                className="mb-4"
                accessibilityRole="link"
                accessibilityLabel="My Guilds"
                accessibilityHint="View your memberships and roles"
                testID="navigate-guilds-button"
              >
                <Card className="flex-row justify-between items-center">
                  <View>
                    <Text className={`text-xl font-bold ${textClass}`}>My Guilds</Text>
                    <Text className={mutedTextClass}>View your memberships and roles</Text>
                  </View>
                  <Text className="text-primary text-2xl">→</Text>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/access-check")}
                activeOpacity={0.7}
                className="mb-4"
                accessibilityRole="link"
                accessibilityLabel="Access Check"
                accessibilityHint="Verify resource access status"
                testID="navigate-access-check-button"
              >
                <Card className="flex-row justify-between items-center">
                  <View>
                    <Text className={`text-xl font-bold ${textClass}`}>Access Check</Text>
                    <Text className={mutedTextClass}>Verify resource access status</Text>
                  </View>
                  <Text className="text-primary text-2xl">→</Text>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/settings")}
                activeOpacity={0.7}
                className="mb-4"
                accessibilityRole="link"
                accessibilityLabel="App Settings"
                accessibilityHint="Configuration and info"
                testID="navigate-settings-button"
              >
                <Card className="flex-row justify-between items-center">
                  <View>
                    <Text className={`text-xl font-bold ${textClass}`}>App Settings</Text>
                    <Text className={mutedTextClass}>Configuration and info</Text>
                  </View>
                  <Text className="text-primary text-2xl">→</Text>
                </Card>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
