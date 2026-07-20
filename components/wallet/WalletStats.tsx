"use client";

import type { Wallet } from "@/types/wallet";

import StatCard from "@/components/ui/stat-card";

interface Props {
  wallet: Wallet;
}

export default function WalletStats({
  wallet,
}: Props) {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-3">

      <StatCard
        title="Available Balance"
        value={`₦${Number(wallet.balance).toLocaleString()}`}
      />

      <StatCard
        title="Currency"
        value={wallet.currency}
      />

      <StatCard
        title="Status"
        value={wallet.status}
      />

    </div>
  );
}