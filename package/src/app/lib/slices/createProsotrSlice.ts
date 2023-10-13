import { StateCreator } from "zustand";
import { Prostor } from "@/app/models/prostor";
import { getProstori } from "@/app/lib/servises/prostorServis";

export interface ProstorSlice {
  prostori: Prostor[];
  prostor: Prostor | undefined;
  godine: number[];
  godina: number | undefined;
  fetchProstor: (obvId: number) => Promise<Prostor>;
  setGodine: (godine: number[]) => void;
  setGodina: (godina: number) => void;
}

export const createProstorSlice: StateCreator<ProstorSlice> = (set) => ({
  prostori: [],
  prostor: undefined,
  godine: [],
  godina: undefined,
  fetchProstor: async (obvId: number): Promise<Prostor> => {
    const response = await getProstori(obvId);
    set({
      prostori: response,
      prostor: response[0],
      godine: response[0].godine,
      godina: response[0].godine[0],
    });

    return response[0];
  },
  setGodine: async (godine: number[]) => {
    set({ godine: godine });
  },
  setGodina: async (godina: number) => {
    set({ godina: godina });
  },
});
