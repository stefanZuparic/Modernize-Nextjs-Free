"use server";
import axios from "@/app/lib/axios";
import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import { error } from "console";

export async function getRacuni(obvId: number, proId: number, godina: number) {
  const session = await getServerSession(options);

  try {
    const res = await axios.get(`/User/racuni/${obvId}/${proId}/${godina}`, {
      headers: { Authorization: `Bearer ${session?.user.token}` },
    });

    if (res.status == 200) return res.data;
  } catch (error) {
    console.log("fetch racuni", error);
  }
}
