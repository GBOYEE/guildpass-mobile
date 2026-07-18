import { View, type ViewProps } from "react-native";
import React from "react";
import { useTheme } from "../features/theme";

type CardProps = ViewProps & {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className = "", ...props }: CardProps) => {
  const { isDark } = useTheme();

  return (
    <View
      {...props}
      className={`rounded-2xl p-4 shadow-sm border ${
        isDark ? "bg-dark-card border-dark-border" : "bg-white border-border"
      } ${className}`}
    >
      {children}
    </View>
  );
};
