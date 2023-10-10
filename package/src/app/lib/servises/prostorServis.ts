"use server";
import axios from "@/app/lib/axios";
import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";

export async function getProstori(obvId: number) {
  const session = await getServerSession(options);

  try {
    const res = await axios.get(`/User/prostori/${obvId}`, {
      headers: { Authorization: `Bearer ${session?.user.token}` },
    });

    if (res.status == 200) {
      const prostori = res.data;
      if (prostori.length > 1 && prostori[0].godine[0] < prostori[1].godine[0])
        return prostori.reverse();
      else if (prostori.length > 0) return prostori;
    }
    return res.statusText;
  } catch (error) {
    console.log("fetch prostori", error);
  }
}
