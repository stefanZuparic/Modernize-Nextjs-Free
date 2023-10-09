import { create } from "zustand";
import { ProstorSlice, createProstorSlice } from "./slices/createProsotrSlice";

type StoreState = ProstorSlice;

export const useStore = create<StoreState>()((...a) => ({
  ...createProstorSlice(...a),
}));
