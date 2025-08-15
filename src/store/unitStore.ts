import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Unit } from '../api/api'

type UnitState = {
  unit: Unit
  setUnit: (u: Unit) => void
}

export const useUnitStore = create<UnitState>()(
  persist(
    (set) => ({
      unit: 'metric',
      setUnit: (u) => set({ unit: u }),
    }),
    {
      name: 'temp-unit',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (s) => ({ unit: s.unit }),
    }
  )
)


