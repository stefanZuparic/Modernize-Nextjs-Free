import { create } from "zustand";
import { ProstorSlice, createProstorSlice } from "./slices/createProsotrSlice";
import { DozvolaSlice, createDozvolaSlice } from "./slices/createDozvolaSlice";
import { RacunSlice, createRacunSlice } from "./slices/createRacunSlice";

type StoreState = ProstorSlice & DozvolaSlice & RacunSlice;

export const useStore = create<StoreState>()((...a) => ({
  ...createProstorSlice(...a),
  ...createDozvolaSlice(...a),
  ...createRacunSlice(...a),
}));
