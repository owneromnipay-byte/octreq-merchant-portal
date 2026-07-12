"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { getPaymentReceipt } from "@/app/services/checkout";
import { PaymentReceipt } from "@/types/paymentReceipt";
function formatCurrency(
  amount: number,
  currency: string
) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
  }).format(amount);
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();

  const reference = searchParams.get("reference");

  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!reference) return;

    loadReceipt();
  }, [reference]);

  async function loadReceipt() {
    try {
      setLoading(true);

      const data = await getPaymentReceipt(reference!);

      setReceipt(data);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div>Loading...</div>
      </main>
    );
  }

  if (!receipt) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden p-8 text-center">
          <h2 className="text-xl font-semibold">{error || "Receipt not found"}</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">

      {/* Success Header */}

      <div className="bg-green-600 text-white p-8 text-center">

        <div className="w-20 h-20 mx-auto rounded-full bg-white flex items-center justify-center">

          <span className="text-4xl text-green-600">
            ✓
          </span>

        </div>

        <h1 className="text-3xl font-bold mt-5">
          Payment Successful
        </h1>

        <p className="mt-2 text-green-100">
          Securely powered by OmniPay
        </p>

      </div>

      {/* Amount */}

      <div className="p-8 text-center">

        <p className="text-gray-500">
          Amount Paid
        </p>

        <h2 className="text-5xl font-bold mt-2">

          {receipt && formatCurrency(
            receipt.amount,
            receipt.currency
          )}

        </h2>

      </div>

      <hr />

      {/* Receipt */}

      <div className="p-8 space-y-5">

        <div className="flex justify-between">

          <span className="text-gray-500">
            Merchant
          </span>

          <span className="font-semibold">
            {receipt.merchant.name}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Customer
          </span>

          <span>
            {receipt.customer.name}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Payment Method
          </span>

          <span>
            {receipt.payment_method}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Status
          </span>

          <span className="text-green-600 font-semibold">
            ✓ Success
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Invoice
          </span>

          <span>
            {receipt.invoice.number}
          </span>

        </div>

        <div>

          <p className="text-gray-500 mb-2">
            Payment Reference
          </p>

          <div className="flex gap-2">

            <input
              readOnly
              value={receipt.payment_reference}
              className="flex-1 border rounded-lg px-3 py-2 text-sm"
            />

            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  receipt.payment_reference
                );

                alert("Copied!");
              }}
              className="px-4 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              Copy
            </button>

          </div>

        </div>

        <div>

          <p className="text-gray-500">
            Paid At
          </p>

          <p className="mt-1">
            {formatDate(receipt.paid_at)}
          </p>

        </div>

      </div>

      {/* Footer */}

      <div className="p-8">

        <button
  onClick={() => {
    if ((receipt?.merchant as any)?.success_url) {
      window.location.href = (receipt.merchant as any).success_url;
    } else {
      window.location.reload();
    }
  }}
  className="w-full mt-8 rounded-lg bg-black text-white py-3"
>
  {(receipt?.merchant as any)?.success_url
    ? "Return to Merchant"
    : "Done"}
</button>

      </div>

    </div>

  </main>
);

}