import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ThemeState, ThemeActions, ThemePreference } from "./theme.types";
import { asyncStorage } from "../../lib/storage";

interface ThemeStore extends ThemeState, ThemeActions {
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      preference: "system",
      _hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
      setPreference: (preference: ThemePreference) => set({ preference }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => asyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
