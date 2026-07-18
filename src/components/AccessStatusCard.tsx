import { View, Text } from "react-native";
import React from "react";
import { Card } from "./Card";
import { RoleBadge } from "./RoleBadge";
import { useTheme } from "../features/theme";

type AccessStatusCardProps = {
  hasAccess: boolean;
  reason?: string;
  matchedRoles: string[];
  requiredRoles: string[];
};

export const AccessStatusCard = ({
  hasAccess,
  reason,
  matchedRoles,
  requiredRoles,
}: AccessStatusCardProps) => {
  const { isDark } = useTheme();
  const textClass = isDark ? "text-dark-text" : "text-text";
  const mutedTextClass = isDark ? "text-dark-text-muted" : "text-text-muted";
  const borderClass = isDark ? "border-dark-border" : "border-border";

  return (
    <Card className={`border-2 ${hasAccess ? "border-success" : "border-error"}`}>
      <View className="items-center mb-6" accessibilityLiveRegion="polite">
        <View
          className={`w-16 h-16 rounded-full items-center justify-center mb-4 ${
            hasAccess ? "bg-success" : "bg-error"
          }`}
          accessibilityLabel={hasAccess ? "Access granted" : "Access denied"}
        >
          <Text className="text-white text-3xl">{hasAccess ? "✓" : "✕"}</Text>
        </View>
        <Text className={`text-2xl font-bold ${hasAccess ? "text-success" : "text-error"}`}>
          {hasAccess ? "Access Granted" : "Access Denied"}
        </Text>
        {reason && <Text className={`mt-2 text-center ${mutedTextClass}`}>{reason}</Text>}
      </View>

      <View className={`border-t pt-4 ${borderClass}`}>
        <Text className={`font-bold mb-3 ${textClass}`}>Requirements</Text>
        <View className="flex-row flex-wrap">
          {requiredRoles.length > 0 ? (
            requiredRoles.map((role) => <RoleBadge key={role} name={role} />)
          ) : (
            <Text className={`italic ${mutedTextClass}`}>No role requirements specified</Text>
          )}
        </View>

        {hasAccess && matchedRoles.length > 0 && (
          <View className="mt-4">
            <Text className="text-success font-bold mb-3">Matched Roles</Text>
            <View className="flex-row flex-wrap">
              {matchedRoles.map((role) => (
                <RoleBadge key={role} name={role} />
              ))}
            </View>
          </View>
        )}
      </View>
    </Card>
  );
};
