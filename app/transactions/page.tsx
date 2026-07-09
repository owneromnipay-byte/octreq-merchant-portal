"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import AppLayout from "../../components/layout/AppLayout";
import TransactionFilters from "../../components/transactions/TransactionFilters";
import TransactionPagination from "../../components/transactions/TransactionPagination";
import { getTransactions } from "../services/api";

const TransactionTable = dynamic(
  () => import("../../components/transactions/TransactionTable"),
  { ssr: false }
);

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);

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
        />

        {pagination && (
          <TransactionPagination
            pagination={pagination}
            onPageChange={loadTransactions}
          />
        )}

      </div>
    </AppLayout>
  );
}