import { View, Text } from "react-native";
import React from "react";
import { formatLastSyncedAt } from "../lib/offlineCache";
import type { StaleReason } from "../lib/staleQueryState";
import { useTheme } from "../features/theme";

type StaleDataBannerProps = {
  reason: StaleReason;
  lastSyncedAt?: Date | null;
  cautionary?: boolean;
};

export function StaleDataBanner({
  reason,
  lastSyncedAt,
  cautionary = false,
}: StaleDataBannerProps) {
  const { isDark } = useTheme();
  const textClass = isDark ? "text-dark-text" : "text-text";
  const mutedTextClass = isDark ? "text-dark-text-muted" : "text-text-muted";

  const lastSyncedLabel = lastSyncedAt ? formatLastSyncedAt(lastSyncedAt.getTime()) : null;
  const message =
    reason === "offline"
      ? cautionary
        ? "You are offline. This access result may be outdated and cannot be refreshed right now."
        : "You are offline. Showing your last saved data, which may be out of date."
      : cautionary
        ? "This access result may be outdated. Connect to refresh before relying on it."
        : "This data may be out of date. Connect to the network to refresh.";

  return (
    <View
      className="bg-secondary/10 border border-secondary/30 rounded-xl px-4 py-3 mb-4"
      accessibilityRole="alert"
      accessibilityLabel={message}
    >
      <Text className="text-secondary font-bold text-sm mb-1">Stale data</Text>
      <Text className={`text-sm ${textClass}`}>{message}</Text>
      {lastSyncedLabel ? (
        <Text className={`text-xs mt-2 ${mutedTextClass}`}>Last synced: {lastSyncedLabel}</Text>
      ) : null}
    </View>
  );
}
