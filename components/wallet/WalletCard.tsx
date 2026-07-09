"use client";

import type { Wallet } from "@/types/wallet";

import { Card, CardContent } from "@/components/ui/card";

import { formatCurrency } from "@/utils/formatCurrency";

interface Props {
  wallet: Wallet;
}

export default function WalletCard({
  wallet,
}: Props) {
  return (
    <Card>

      <CardContent className="p-8">

        <p className="text-sm text-slate-500">
          Available Balance
        </p>

        <h1 className="mt-3 text-5xl font-bold">
          {formatCurrency(wallet.balance)}
        </h1>

        <div className="mt-4 flex items-center gap-3">

          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
            {wallet.currency}
          </span>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            {wallet.status}
          </span>

        </div>

      </CardContent>

    </Card>
  );
}