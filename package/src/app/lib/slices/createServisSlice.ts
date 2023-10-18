import { Servis } from "@/app/models/servis";
import { StateCreator } from "zustand";
import { getServisi } from "../servises/servisServis";

export interface ServisSlice {
  servisi: Servis[];
  servis: Servis | undefined;
  fetchServisi: (
    obvId: number,
    proId: number,
    rgId: string,
    rzId: string
  ) => Promise<Servis[]>;
  setServis: (servis: Servis) => void;
}

export const createServisSlice: StateCreator<ServisSlice> = (set) => ({
  servisi: [],
  servis: undefined,
  fetchServisi: async (
    obvId: number,
    proId: number,
    rgId: string,
    rzId: string
  ) => {
    const servisi = await getServisi(obvId, proId, rgId, rzId);
    set({ servisi: servisi, servis: servisi[0] });
    return servisi;
  },
  setServis: async (servis: Servis) => {
    set({ servis: servis });
  },
});
