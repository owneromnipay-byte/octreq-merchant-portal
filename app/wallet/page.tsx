"use client";

import { useEffect, useMemo, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";

import WalletCard from "@/components/wallet/WalletCard";
import WalletStats from "@/components/wallet/WalletStats";
import LedgerFilters from "@/components/wallet/LedgerFilters";
import LedgerTable from "@/components/wallet/LedgerTable";
import LedgerDetailsModal from "@/components/wallet/LedgerDetailsModal";

import TransactionPagination from "@/components/transactions/TransactionPagination";

import type { Wallet } from "@/types/wallet";
import type { LedgerEntry } from "@/types/ledger";

import { getWallet, getLedger } from "../services/api";

export default function WalletPage() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [ledger, setLedger] = useState<LedgerEntry[]>([]);
  const [pagination, setPagination] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const [selectedEntry, setSelectedEntry] =
    useState<LedgerEntry | null>(null);

  useEffect(() => {
    loadWallet(1);
  }, []);

  async function loadWallet(page: number) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const [walletData, ledgerResponse] = await Promise.all([
        getWallet(token),
        getLedger(token, page),
      ]);

      setWallet(walletData);
      setLedger(ledgerResponse.ledger);
      setPagination(ledgerResponse.pagination);

    } catch (error) {
      console.error(error);

      localStorage.removeItem("token");
      localStorage.removeItem("merchant");

      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  }

  const filteredLedger = useMemo(() => {
    return ledger.filter((entry) => {
      const matchesSearch =
        search === "" ||
        entry.reference
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        entry.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        type === "" ||
        entry.entry_type === type;

      return matchesSearch && matchesType;
    });
  }, [ledger, search, type]);

  if (loading || !wallet) {
    return (
      <AppLayout>
        <div className="p-8">
          <h2 className="text-2xl font-semibold">
            Loading Wallet...
          </h2>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>

      <h1 className="text-4xl font-bold">
        Wallet
      </h1>

      <p className="mt-2 text-slate-500">
        Manage your wallet balance and ledger.
      </p>

      <div className="mt-8">
        <WalletCard wallet={wallet} />
      </div>

      <WalletStats wallet={wallet} />

      <div className="mt-10">

        <LedgerFilters
          search={search}
          type={type}
          onSearchChange={setSearch}
          onTypeChange={setType}
        />

        <LedgerTable
          ledger={filteredLedger}
          onRowClick={setSelectedEntry}
        />

        {pagination && (
          <TransactionPagination
            pagination={pagination}
            onPageChange={loadWallet}
          />
        )}

      </div>

      <LedgerDetailsModal
        entry={selectedEntry}
        open={!!selectedEntry}
        onClose={() => setSelectedEntry(null)}
      />

    </AppLayout>
  );
}