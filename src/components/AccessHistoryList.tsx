import { View, Text } from "react-native";
import React from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import { useTheme } from "../features/theme";
import type { AccessHistoryEntry } from "../features/access/accessHistory.store";

type AccessHistoryListProps = {
  entries: AccessHistoryEntry[];
  onClear: () => void;
};

const statusLabel = (status: AccessHistoryEntry["status"]) => {
  switch (status) {
    case "granted":
      return "Granted";
    case "denied":
      return "Denied";
    case "error":
      return "Error";
  }
};

const statusClassName = (status: AccessHistoryEntry["status"]) =>
  status === "granted" ? "text-success" : "text-error";

export const AccessHistoryList = ({ entries, onClear }: AccessHistoryListProps) => {
  const { isDark } = useTheme();
  const textClass = isDark ? "text-dark-text" : "text-text";
  const mutedTextClass = isDark ? "text-dark-text-muted" : "text-text-muted";
  const borderClass = isDark ? "border-dark-border" : "border-border";

  if (entries.length === 0) {
    return null;
  }

  return (
    <Card className="mb-12">
      <View className="flex-row justify-between items-center mb-4">
        <Text className={`text-lg font-bold ${textClass}`}>Recent Access Checks</Text>
        <Button title="Clear History" onPress={onClear} variant="outline" className="py-2 px-3" />
      </View>

      {entries.map((entry) => (
        <View key={entry.id} className={`py-3 border-t ${borderClass}`}>
          <View className="flex-row justify-between">
            <Text className={`font-semibold ${textClass}`}>{entry.resourceId}</Text>
            <Text className={`font-bold ${statusClassName(entry.status)}`}>
              {statusLabel(entry.status)}
            </Text>
          </View>
          <Text className={`text-sm mt-1 ${mutedTextClass}`}>{entry.guildId}</Text>
          {entry.reason ? (
            <Text className={`text-sm mt-1 ${mutedTextClass}`}>{entry.reason}</Text>
          ) : null}
          <Text className={`text-xs mt-1 ${mutedTextClass}`}>
            {new Date(entry.checkedAt).toLocaleString()}
          </Text>
        </View>
      ))}
    </Card>
  );
};
