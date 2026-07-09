"use client";

import type { Transaction } from "@/types/transaction";

import {
  formatCurrency,
} from "@/utils/formatCurrency";

import {
  formatDateTime,
} from "@/utils/formatDate";

interface Props {
  transaction: Transaction | null;
  open: boolean;
  onClose: () => void;
}

export default function TransactionDetailsModal({
  transaction,
  open,
  onClose,
}: Props) {
  if (!open || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-xl">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Transaction Details
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
            label="Payment Reference"
            value={transaction.payment_reference}
          />

          <Detail
            label="Provider"
            value={transaction.provider}
          />

          <Detail
            label="Provider Reference"
            value={transaction.provider_reference || "-"}
          />

          <Detail
            label="Invoice ID"
            value={transaction.invoice_id || "-"}
          />

          <Detail
            label="Amount"
            value={formatCurrency(transaction.amount)}
          />

          <Detail
            label="Currency"
            value={transaction.currency || "NGN"}
          />

          <Detail
            label="Status"
            value={transaction.status}
          />

          <Detail
            label="Description"
            value={transaction.description || "-"}
          />

          <Detail
            label="Created"
            value={formatDateTime(transaction.created_at)}
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