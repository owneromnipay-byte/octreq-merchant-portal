"use client";

// Local Invoice type to avoid missing module error for '@/types/invoice'
// Keep in sync with the actual shared type if/when it's available.
interface Invoice {
  invoice_number: string;
  customer_name: string;
  customer_email: string;
  amount: number;
  currency: string;
  status: string;
  virtual_account_number?: string | null;
  bank_name?: string | null;
  provider: string;
  provider_reference?: string | null;
  payment_reference?: string | null;
  description?: string | null;
  created_at: string;
}
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateTime } from "@/utils/formatDate";

interface Props {
  invoice: Invoice | null;
  open: boolean;
  onClose: () => void;
}

export default function InvoiceDetailsModal({
  invoice,
  open,
  onClose,
}: Props) {
  if (!open || !invoice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-3xl rounded-xl bg-white p-8 shadow-xl">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Invoice Details
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
            label="Invoice Number"
            value={invoice.invoice_number}
          />

          <Detail
            label="Customer Name"
            value={invoice.customer_name}
          />

          <Detail
            label="Customer Email"
            value={invoice.customer_email}
          />

          <Detail
            label="Amount"
            value={formatCurrency(invoice.amount)}
          />

          <Detail
            label="Currency"
            value={invoice.currency}
          />

          <Detail
            label="Status"
            value={invoice.status}
          />

          <Detail
            label="Virtual Account"
            value={invoice.virtual_account_number || "-"}
          />

          <Detail
            label="Bank Name"
            value={invoice.bank_name || "-"}
          />

          <Detail
            label="Provider"
            value={invoice.provider}
          />

          <Detail
            label="Provider Reference"
            value={invoice.provider_reference}
          />

          <Detail
            label="Payment Reference"
            value={invoice.payment_reference}
          />

          <Detail
            label="Description"
            value={invoice.description || "-"}
          />

          <Detail
            label="Created"
            value={formatDateTime(invoice.created_at)}
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
  value?: string | null;
}) {
  return (
    <div>

      <p className="text-sm text-slate-500">{label}</p>

      <p className="mt-1 break-all font-semibold">{value ?? "-"}</p>

    </div>
  );
}