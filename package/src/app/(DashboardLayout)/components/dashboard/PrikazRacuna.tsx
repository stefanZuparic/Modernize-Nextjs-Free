import React from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import { Grid, Typography } from "@mui/material";
import axios from "@/app/lib/axios";
import { useSession } from "next-auth/react";

interface Props {
  icon: any;
  url: string;
  type: string;
}
export default function PrikazRacuna({ icon, url, type }: Props) {
  const Icon = icon;
  const itemIcon = <Icon stroke={1.5} size="50px" />;
  const { data: session } = useSession();

  const onClick = async (e: any) => {
    let pom = url.replace(/&rz_id=|rg_id=/g, "/");

    let res;
    if (pom.includes("&type=jpeg")) {
      pom = pom.replace("&type=jpeg", "");
      try {
        res = await axios.post(
          `/User/billJpeg${pom}`,
          {
            username: session?.user.username,
            password: session?.user.password,
          },
          {
            headers: { Authorization: `Bearer ${session?.user.token}` },
            responseType: "blob",
          }
        );
      } catch (error) {
        console.log("fetch pdf", error);
      }
    } else {
      try {
        res = await axios.post(
          `/User/billPdf${pom}`,
          {
            username: session?.user.username,
            password: session?.user.password,
          },
          {
            headers: { Authorization: `Bearer ${session?.user.token}` },
            responseType: "blob",
          }
        );
      } catch (error) {
        console.log("fetch jpeg", error);
      }
    }

    if (res?.status == 200) {
      const pdf = res.data;
      const fileUrl = URL.createObjectURL(pdf);
      window.open(fileUrl);
    } else {
      console.log("prikaz racuna error", res?.statusText);
    }
  };

  return (
    <Grid
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      onClick={onClick}
    >
      {itemIcon}
      <Typography variant="subtitle2" fontWeight={600} noWrap>
        {`Ovde možete skinuti ${type} prikaz računa.`}
      </Typography>
    </Grid>
  );
}
