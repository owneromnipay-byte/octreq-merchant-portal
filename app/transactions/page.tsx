"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import AppLayout from "@/components/layout/AppLayout";
import TransactionFilters from "@/components/transactions/TransactionFilters";
import TransactionPagination from "@/components/transactions/TransactionPagination";
import TransactionDetailsModal from "@/components/transactions/TransactionDetailsModal";

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

      alert("Unable to load transactions.");

      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <AppLayout>
        <h2 className="text-2xl font-semibold">
          Loading Transactions...
        </h2>
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

        <TransactionTable
          transactions={transactions}
          onRowClick={(transaction) => setSelectedTransaction(transaction as Transaction)}
        />

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