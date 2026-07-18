import { useColorScheme } from "react-native";
import { useThemeStore } from "./theme.store";
import { ThemePreference } from "./theme.types";

export type ColorScheme = "light" | "dark";

export function useTheme() {
  const systemColorScheme = useColorScheme();
  const { preference, setPreference, _hasHydrated } = useThemeStore();

  const effectiveColorScheme: ColorScheme =
    preference === "system"
      ? systemColorScheme ?? "light"
      : preference;

  const isDark = effectiveColorScheme === "dark";

  return {
    preference,
    setPreference,
    colorScheme: effectiveColorScheme,
    isDark,
    isHydrated: _hasHydrated,
  };
}
