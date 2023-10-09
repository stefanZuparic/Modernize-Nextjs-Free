import { StateCreator } from "zustand";
import { Prostor } from "@/app/models/prostor";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";
import { useSession } from "next-auth/react";
import { getProstori } from "@/app/api/servises/prostorServis";

export interface ProstorSlice {
  prostori: Prostor[];
  prostor: Prostor | undefined;
  fetchProstor: (obvId: number) => void;
}

export const createProstorSlice: StateCreator<ProstorSlice> = (set) => ({
  prostori: [],
  prostor: undefined,
  fetchProstor: async (obvId: number) => {
    const response = await getProstori(obvId);

    set({ prostori: response, prostor: response[0] });
  },
});
