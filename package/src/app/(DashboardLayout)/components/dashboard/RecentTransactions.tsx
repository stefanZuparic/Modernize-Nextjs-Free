import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useStore } from "@/app/lib/store";
import { Grid, Link, Typography, styled } from "@mui/material";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import QRcode from "qrcode.react";
import PrikazRacuna from "./PrikazRacuna";
import { IconFileTypePdf, IconFileTypeJpg } from "@tabler/icons-react";

const LinkStyled = styled(Link)(() => ({
  height: "192px",
  width: "180px",
  overflow: "hidden",
}));

const RecentTransactions = () => {
  const { racun, servisi } = useStore();

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = "#ecf2ff";
  const successlight = theme.palette.success.light;
  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "pie",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
      height: 155,
    },
    labels: servisi.map((servis) => servis.srvNaziv),
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "100%",
          background: "transparent",
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: true,
    },
    stroke: {
      show: true,
    },
    legend: {
      show: true,
    },
    colors: [
      "#FF6633",
      "#E6B333",
      "#80B300",
      "#AF99E6",
      "#66994D",
      "#66664D",
      "#E666B3",
      "#6662FF",
      "#FF3380",
      "#4666FF",
      "#DAFF9A",
      "#99FF99",
      "#4D80CC",
      "#7DF3FF",
      "#FF1A66",
    ],
    dataLabels: {
      enabled: true,
    },
    responsive: [
      {
        breakpoint: 0,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  const seriescolumnchart: any = servisi.map((servis) =>
    Number(servis.rsDug.replace(/\,/g, ""))
  );
  return (
    <DashboardCard
      title={`Detalji računa za ${racun?.mesec.split(".")[1]}. mesec ${
        racun?.mesec.split(".")[0]
      }. godine`}
    >
      <Grid container>
        <Grid item lg={12}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="pie"
            height="330px"
          />
        </Grid>
        <Grid
          item
          lg={7}
          mt={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "auto",
          }}
        >
          <QRcode size={300} value={racun?.qrCode!} includeMargin={true} />
          <Typography variant="subtitle2" fontWeight={600}>
            QR kod za plaćanje računa
          </Typography>
        </Grid>
        <Grid
          item
          lg={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            height: "auto",
          }}
        >
          <PrikazRacuna
            icon={IconFileTypePdf}
            url={racun?.urlPdf!}
            type="PDF"
          />
          <PrikazRacuna
            icon={IconFileTypeJpg}
            url={racun?.urlJpeg!}
            type="JPEG"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default RecentTransactions;
