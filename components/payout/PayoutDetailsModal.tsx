"use client";

import type { Payout } from "@/types/payout";

import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateTime } from "@/utils/formatDate";

interface Props {
  payout: Payout | null;
  open: boolean;
  onClose: () => void;
}

export default function PayoutDetailsModal({
  payout,
  open,
  onClose,
}: Props) {
  if (!open || !payout) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-3xl rounded-xl bg-white p-8 shadow-xl">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Payout Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg border px-3 py-1"
          >
            Close
          </button>

        </div>

        <div className="mt-8 grid grid-cols-2 gap-6">

          <Detail
            label="Recipient"
            value={payout.account_name}
          />

          <Detail
            label="Account Number"
            value={payout.account_number}
          />

          <Detail
            label="Bank"
            value={payout.bank_name}
          />

          <Detail
            label="Amount"
            value={formatCurrency(payout.amount)}
          />

          <Detail
            label="Currency"
            value={payout.currency}
          />

          <Detail
            label="Status"
            value={payout.status}
          />

          <Detail
            label="Provider"
            value={payout.provider}
          />

          <Detail
            label="Provider Reference"
            value={payout.provider_reference}
          />

          <Detail
            label="Created"
            value={formatDateTime(payout.created_at)}
          />

        </div>

      </div>

    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-all font-semibold">
        {value}
      </p>

    </div>
  );
}