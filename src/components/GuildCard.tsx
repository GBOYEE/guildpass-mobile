import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Card } from "./Card";
import { useTheme } from "../features/theme";

type GuildCardProps = {
  name: string;
  id: string;
  isActive: boolean;
  roleCount: number;
  onPress: () => void;
};

export const GuildCard = ({ name, id, isActive, roleCount, onPress }: GuildCardProps) => {
  const { isDark } = useTheme();
  const textClass = isDark ? "text-dark-text" : "text-text";
  const mutedTextClass = isDark ? "text-dark-text-muted" : "text-text-muted";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${isActive ? "Active" : "Inactive"}, ${roleCount} roles`}
    >
      <Card className="mb-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className={`text-xl font-bold ${textClass}`}>{name}</Text>
          <View
            className={`px-3 py-1 rounded-full ${isActive ? "bg-success/10" : "bg-text-muted/10"}`}
          >
            <Text className={`text-xs font-bold ${isActive ? "text-success" : mutedTextClass}`}>
              {isActive ? "ACTIVE" : "INACTIVE"}
            </Text>
          </View>
        </View>
        <Text className={`text-sm mb-4 ${mutedTextClass}`}>ID: {id}</Text>
        <View className="flex-row items-center">
          <Text className="text-primary font-semibold">{roleCount} Roles</Text>
          <Text className={`mx-2 ${mutedTextClass}`}>•</Text>
          <Text className={mutedTextClass}>Tap to view details</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
