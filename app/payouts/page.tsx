"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";
import TableSkeleton from "@/components/ui/TableSkeleton";
import PayoutTable from "@/components/payout/PayoutTable";
import PayoutFilters from "@/components/payout/PayoutFilters";
import PayoutDetailsModal from "@/components/payout/PayoutDetailsModal";
import CreatePayoutModal from "@/components/payout/CreatePayoutModal";
import EmptyState from "@/components/ui/EmptyState";
import { Landmark } from "lucide-react";
import TransactionPagination from "@/components/transactions/TransactionPagination";

import type { Payout } from "@/types/payout";

import { getPayouts } from "../services/api";

export default function PayoutsPage() {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [pagination, setPagination] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [selectedPayout, setSelectedPayout] =
    useState<Payout | null>(null);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  useEffect(() => {
    loadPayouts(1);
  }, [search, status]);

  async function loadPayouts(page: number) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const data = await getPayouts(token, {
        page,
        limit: 10,
        search,
        status,
      });

      setPayouts(data.payouts);
      setPagination(data.pagination);
    } catch (error) {
      console.error(error);

      localStorage.removeItem("token");
      localStorage.removeItem("merchant");

      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
  return (
    <AppLayout>
      <TableSkeleton />
    </AppLayout>
  );
}

  return (
    <AppLayout>

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            Payouts
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your payout requests.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
        >
          + New Payout
        </button>

      </div>

      <div className="mt-8">

        <PayoutFilters
          search={search}
          status={status}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
        />

        {payouts.length === 0 ? (
  <EmptyState
    icon={Landmark}
    title="No payouts yet"
    description="Your payout history will appear here once you send your first payout."
  />
) : (
  <PayoutTable
    payouts={payouts}
    onRowClick={setSelectedPayout}
  />
)}

        {pagination && (
          <TransactionPagination
            pagination={pagination}
            onPageChange={loadPayouts}
          />
        )}

      </div>

      <PayoutDetailsModal
        payout={selectedPayout}
        open={!!selectedPayout}
        onClose={() => setSelectedPayout(null)}
      />

      <CreatePayoutModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => loadPayouts(1)}
      />

    </AppLayout>
  );
}