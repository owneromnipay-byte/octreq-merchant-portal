"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
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
            Welcome back to OmniPay.
          </p>

        </div>

      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-sm text-slate-500">
            Wallet Balance
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            ₦{Number(dashboard.wallet.balance).toLocaleString()}
          </h2>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-sm text-slate-500">
            Today's Revenue
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            ₦{Number(dashboard.revenue.today).toLocaleString()}
          </h2>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-sm text-slate-500">
            Total Transactions
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {dashboard.transactions.total}
          </h2>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-sm text-slate-500">
            Total Revenue
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            ₦{Number(dashboard.revenue.total).toLocaleString()}
          </h2>

        </div>

      </div>

      <RecentTransactions
        transactions={dashboard.recent_transactions}
      />

    </AppLayout>
  );
}