"use server";
import axios from "@/app/lib/axios";
import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";

export async function getServisi(
  obvId: number,
  proId: number,
  rgId: string,
  rzId: string
) {
  const session = await getServerSession(options);

  try {
    const res = await axios.get(
      `/User/servis/${obvId}/${proId}/${rgId}/${rzId}`,
      {
        headers: { Authorization: `Bearer ${session?.user.token}` },
      }
    );

    if (res.status == 200) return res.data;
  } catch (error) {
    console.log("fetch servis", error);
  }
}
