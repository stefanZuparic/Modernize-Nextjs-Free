import { Dozvola } from "@/app/models/dozvola";
import { StateCreator } from "zustand";

export interface DozvolaSlice {
  dozvola: Dozvola | undefined;
  setDozvola: (dozvola: Dozvola) => void;
}

export const createDozvolaSlice: StateCreator<DozvolaSlice> = (set) => ({
  dozvola: undefined,
  setDozvola: async (dozvola: Dozvola) => {
    set({ dozvola: dozvola });
  },
});
