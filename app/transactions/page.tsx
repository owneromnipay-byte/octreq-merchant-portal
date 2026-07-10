"use client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import EmptyState from "@/components/ui/EmptyState";
import { ArrowLeftRight } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import TransactionFilters from "@/components/transactions/TransactionFilters";
import TransactionPagination from "@/components/transactions/TransactionPagination";
import TransactionDetailsModal from "@/components/transactions/TransactionDetailsModal";
import TableSkeleton from "@/components/ui/TableSkeleton";
import type { Transaction } from "@/types/transaction";

import { getTransactions } from "../services/api";

const TransactionTable = dynamic(
  () => import("@/components/transactions/TransactionTable"),
  { ssr: false }
);

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [transactionType, setTransactionType] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions(1);
  }, [search, status, transactionType]);

  async function loadTransactions(page: number) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const data = await getTransactions(token, {
        page,
        limit: 20,
        search,
        status,
        transactionType,
      });

      setTransactions(data.transactions);
      setPagination(data.pagination);
    } catch (err) {
      console.error(err);

      toast.error("Unable to load transactions.");

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
      <h1 className="text-4xl font-bold">
        Transactions
      </h1>

      <p className="mt-2 text-slate-500">
        View all payment transactions.
      </p>

      <div className="mt-8">
        <TransactionFilters
          search={search}
          status={status}
          transactionType={transactionType}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onTransactionTypeChange={setTransactionType}
        />

      {transactions.length === 0 ? (
  <EmptyState
    icon={ArrowLeftRight}
    title="No transactions yet"
    description="Your payment transactions will appear here."
  />
) : (
  <TransactionTable
    transactions={transactions}
    onRowClick={setSelectedTransaction}
  />
)}

        {pagination && (
          <TransactionPagination
            pagination={pagination}
            onPageChange={loadTransactions}
          />
        )}
      </div>

      <TransactionDetailsModal
        transaction={selectedTransaction}
        open={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </AppLayout>
  );
}