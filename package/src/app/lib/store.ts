import { create } from "zustand";
import { ProstorSlice, createProstorSlice } from "./slices/createProsotrSlice";
import { DozvolaSlice, createDozvolaSlice } from "./slices/createDozvolaSlice";
import { RacunSlice, createRacunSlice } from "./slices/createRacunSlice";
import { ServisSlice, createServisSlice } from "./slices/createServisSlice";

type StoreState = ProstorSlice & DozvolaSlice & RacunSlice & ServisSlice;

export const useStore = create<StoreState>()((...a) => ({
  ...createProstorSlice(...a),
  ...createDozvolaSlice(...a),
  ...createRacunSlice(...a),
  ...createServisSlice(...a),
}));
