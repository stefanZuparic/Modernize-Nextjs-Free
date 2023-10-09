"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
// components
import SalesOverview from "@/app/(DashboardLayout)/components/dashboard/SalesOverview";
import YearlyBreakup from "@/app/(DashboardLayout)/components/dashboard/YearlyBreakup";
import RecentTransactions from "@/app/(DashboardLayout)/components/dashboard/RecentTransactions";
import ProductPerformance from "@/app/(DashboardLayout)/components/dashboard/ProductPerformance";
import Blog from "@/app/(DashboardLayout)/components/dashboard/Blog";
import MonthlyEarnings from "@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings";
import { Prostor } from "../models/prostor";
import { useEffect, useState } from "react";
import { getProstori } from "../api/servises/prostorServis";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Dozvola } from "../models/dozvola";
import { useStore } from "../lib/store";

const Dashboard = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  const { prostori, prostor, fetchProstor } = useStore();
  // const [prostori, setProstori] = useState<Prostor[]>([]);
  const [dozvola, setDozvola] = useState<Dozvola>();
  // const [prostor, setProstor] = useState<Prostor>();

  useEffect(() => {
    if (session) {
      setDozvola(session?.user.dozvole[0]);
      fetchProstor(session?.user.dozvole[0].obv_id);
    }
  }, [session?.user]);

  console.log(prostor);
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
