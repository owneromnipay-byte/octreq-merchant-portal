"use client";
import { toast } from "sonner";
import { useState } from "react";

import { createInvoice } from "@/app/services/api";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateInvoiceModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleSubmit() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      setLoading(true);

      await createInvoice(token, {
        customer_name: customerName,
        customer_email: customerEmail,
        amount: Number(amount),
        currency,
        description,
      });

      toast.success("Invoice created successfully.");

      onSuccess();
      onClose();

      setCustomerName("");
      setCustomerEmail("");
      setAmount("");
      setCurrency("NGN");
      setDescription("");

    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-xl">

        <h2 className="text-2xl font-bold">
          Create Invoice
        </h2>

        <div className="mt-6 space-y-4">

          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

          <input
            type="email"
            placeholder="Customer Email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

          <input
            type="text"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-lg bg-green-600 px-4 py-2 text-white disabled:opacity-50"
          >
            {loading ? "Creating..." : "Generate Invoice"}
          </button>

        </div>

      </div>

    </div>
  );
}