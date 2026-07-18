export type ThemePreference = "system" | "light" | "dark";

export interface ThemeState {
  preference: ThemePreference;
}

export interface ThemeActions {
  setPreference: (preference: ThemePreference) => void;
}
