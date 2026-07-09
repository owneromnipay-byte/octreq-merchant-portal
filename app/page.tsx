"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import RevenueChart from "@/components/dashboard/RevenueChart";
import StatCard from "@/components/ui/stat-card";

import { getDashboard } from "./services/api";

export default function Home() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const data = await getDashboard(token);

        setDashboard(data);
      } catch (error) {
        console.error(error);

        localStorage.removeItem("token");
        localStorage.removeItem("merchant");

        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <div className="p-8">
          <h2 className="text-2xl font-semibold">
            Loading Dashboard...
          </h2>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back to OmniPay 👋
          </p>

        </div>

      </div>

      {/* KPI Cards */}

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Wallet Balance"
          value={`₦${Number(dashboard.wallet.balance).toLocaleString()}`}
        />

        <StatCard
          title="Today's Revenue"
          value={`₦${Number(dashboard.revenue.today).toLocaleString()}`}
        />

        <StatCard
          title="Total Transactions"
          value={dashboard.transactions.total}
        />

        <StatCard
          title="Total Revenue"
          value={`₦${Number(dashboard.revenue.total).toLocaleString()}`}
        />

      </div>

      {/* Revenue Chart */}

      <RevenueChart
        data={dashboard.revenue_chart}
      />

      {/* Recent Transactions */}

      <RecentTransactions
        transactions={dashboard.recent_transactions}
      />

    </AppLayout>
  );
}