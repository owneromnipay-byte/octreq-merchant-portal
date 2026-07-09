"use client";

import type { LedgerEntry } from "@/types/ledger";

import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateTime } from "@/utils/formatDate";

interface Props {
  entry: LedgerEntry | null;
  open: boolean;
  onClose: () => void;
}

export default function LedgerDetailsModal({
  entry,
  open,
  onClose,
}: Props) {
  if (!open || !entry) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-xl">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Ledger Entry
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
            label="Reference"
            value={entry.reference}
          />

          <Detail
            label="Type"
            value={entry.entry_type}
          />

          <Detail
            label="Amount"
            value={formatCurrency(entry.amount)}
          />

          <Detail
            label="Balance Before"
            value={formatCurrency(entry.balance_before)}
          />

          <Detail
            label="Balance After"
            value={formatCurrency(entry.balance_after)}
          />

          <Detail
            label="Currency"
            value={entry.currency}
          />

          <Detail
            label="Description"
            value={entry.description}
          />

          <Detail
            label="Created"
            value={formatDateTime(entry.created_at)}
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