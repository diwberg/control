import { create } from "zustand"

type FiltersState = {
  accountId?: string | undefined,
  to: Date | undefined
  from: Date | undefined
  setAccountId: (id: string) => void
  setDateTo: (date: Date) => void
  setDateFrom: (date: Date) => void
}

export const useFilters = create<FiltersState>((set) => ({
  accountId: undefined,
  to: undefined,
  from: undefined,
  setAccountId: (id: string) => set({ accountId: id }),
  setDateTo: (date: Date) => set({ to: date}),
  setDateFrom: (date: Date) => set({ from: date}),
}))
