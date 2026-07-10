"use client";

import { useState } from "react";

import { createPayout } from "@/app/services/api";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreatePayoutModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("NGN");

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleSubmit() {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      setLoading(true);

      await createPayout(token, {
        amount: Number(amount),
        currency,
        bank_name: bankName,
        bank_code: bankCode,
        account_number: accountNumber,
        account_name: accountName,
      });

      alert("Payout created successfully.");

      onSuccess();
      onClose();

      setAccountName("");
      setAccountNumber("");
      setBankName("");
      setBankCode("");
      setAmount("");
      setCurrency("NGN");

    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-xl">

        <h2 className="text-2xl font-bold">
          Create Payout
        </h2>

        <div className="mt-6 space-y-4">

          <input
            type="text"
            placeholder="Account Name"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

          <input
            type="text"
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

          <input
            type="text"
            placeholder="Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

          <input
            type="text"
            placeholder="Bank Code"
            value={bankCode}
            onChange={(e) => setBankCode(e.target.value)}
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
            {loading ? "Sending..." : "Send Payout"}
          </button>

        </div>

      </div>

    </div>
  );
}