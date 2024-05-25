
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GuideNavigationState {
  done: boolean
  onDone: () => void
}

export const useGuideNavigation = create<GuideNavigationState>()(
    persist(
      (set, get) => ({
        done: false,
        onDone: () => set((state) => ({ done: !state.done })),
      }),
      { name: 'guide-navigation' },
    ),
)