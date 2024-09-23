import { create } from "zustand"

export const useStoryStore = create((set) => ({
  mode: "withoutLUCF",
  setMode: (mode) => set({ mode }),
}))
