import { View, Text, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../src/components/Button";
import { useTheme } from "../src/features/theme";

export default function Onboarding() {
  const router = useRouter();
  const { isDark } = useTheme();

  const bgClass = isDark ? "bg-dark-background" : "bg-white";
  const textClass = isDark ? "text-dark-text" : "text-text";
  const mutedTextClass = isDark ? "text-dark-text-muted" : "text-text-muted";
  const infoBgClass = isDark ? "bg-dark-card" : "bg-background";

  return (
    <SafeAreaView className={`flex-1 ${bgClass}`} testID="onboarding-screen">
      <View className="flex-1 px-6 justify-between py-12">
        <View className="items-center mt-12">
          <View className="w-24 h-24 bg-primary rounded-3xl items-center justify-center mb-8 shadow-lg">
            <Text className="text-white text-4xl font-bold">GP</Text>
          </View>
          <Text
            className={`text-3xl font-bold text-center mb-4 ${textClass}`}
            testID="onboarding-title"
          >
            Welcome to GuildPass
          </Text>
          <Text
            className={`text-lg text-center px-4 ${mutedTextClass}`}
            testID="onboarding-subtitle"
          >
            The decentralized gateway to your favorite Web3 communities and gated content.
          </Text>
        </View>

        <View className="space-y-4">
          <View className={`p-4 rounded-2xl mb-8 ${infoBgClass}`}>
            <Text className={`font-semibold mb-2 text-center ${textClass}`}>MVP Preview Mode</Text>
            <Text className={`text-sm text-center ${mutedTextClass}`}>
              you can manually enter any wallet address to explore guild memberships.
            </Text>
          </View>

          <Button
            title="Get Started"
            onPress={() => router.push("/profile")}
            testID="onboarding-get-started-button"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
