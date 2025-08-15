import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type ThemeState = {
  dark: boolean
  toggle: () => void
  setDark: (v: boolean) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      dark: false,
      toggle: () => set({ dark: !get().dark }),
      setDark: (v) => set({ dark: v }),
    }),
    {
      name: 'dark-mode',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ dark: s.dark }),
    }
  )
)