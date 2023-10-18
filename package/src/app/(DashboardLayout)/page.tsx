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
import { getProstori } from "../lib/servises/prostorServis";
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

  const { setDozvola, fetchProstor, fetchRacuni, fetchServisi } = useStore();

  useEffect(() => {
    if (session) {
      setDozvola(session?.user.dozvole[0]);
      fetchProstor(session?.user.dozvole[0].obv_id).then((prostor) => {
        fetchRacuni(
          session.user.dozvole[0]?.obv_id!,
          prostor?.pro_id!,
          prostor.godine[0]!
        ).then((racun) => {
          fetchServisi(
            session?.user.dozvole[0].obv_id!,
            prostor.pro_id!,
            racun.rgId,
            racun.rzId
          );
        });
      });
    }
  }, [session?.user]);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} lg={8}>
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
          </Grid> */}
          <Grid item xs={12} lg={6}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12} lg={6}>
            <RecentTransactions />
          </Grid>
          {/* <Grid item xs={12}>
            <Blog />
          </Grid> */}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
