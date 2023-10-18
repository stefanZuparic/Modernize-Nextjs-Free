import { Racun } from "@/app/models/racun";
import { StateCreator } from "zustand";
import { getRacuni } from "../servises/racunServis";

export interface RacunSlice {
  racuni: Racun[];
  racun: Racun | undefined;
  fetchRacuni: (obvId: number, proId: number, godina: number) => Promise<Racun>;
  setRacun: (racun: Racun) => void;
}

export const createRacunSlice: StateCreator<RacunSlice> = (set) => ({
  racuni: [],
  racun: undefined,
  fetchRacuni: async (obvId: number, proId: number, godina: number) => {
    const racuni = await getRacuni(obvId, proId, godina);
    set({ racuni: racuni, racun: racuni[0] });
    return racuni[0];
  },
  setRacun: async (racun: Racun) => {
    set({ racun: racun });
  },
});
