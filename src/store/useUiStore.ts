/**
 * Zustand store — global UI state (theme, mobile nav).
 * Author: Avijit Ghosh
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";

interface UiState {
  theme: Theme;
  isMobileNavOpen: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setMobileNavOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: "light",
      isMobileNavOpen: false,
      toggleTheme: () => set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
      setTheme: (theme) => set({ theme }),
      setMobileNavOpen: (isMobileNavOpen) => set({ isMobileNavOpen }),
    }),
    { name: "ag-ui", partialize: (s) => ({ theme: s.theme }) }
  )
);
