"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  getCheckout,
  initializeCheckoutPayment,
  getPaymentStatus,
} from "@/app/services/checkout";

import { useRouter } from "next/navigation";

import { Checkout } from "@/types/checkout";

export default function CheckoutPage() {
  const { reference } = useParams();
const router = useRouter();
  const [checkout, setCheckout] = useState<Checkout | null>(null);
  const [payment, setPayment] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(false);

  const [error, setError] = useState("");
const [expired, setExpired] = useState(false);
  useEffect(() => {
    if (!reference) return;

    loadCheckout();
  }, [reference]);
useEffect(() => {
  if (!payment) return;

  const interval = setInterval(async () => {
    try {
      console.log("Checking payment status...");

      const result = await getPaymentStatus(
        payment.payment_reference
      );

      console.log("Payment Status:", result);

      if (result.status === "SUCCESS") {

        clearInterval(interval);

        router.push(
          `/checkout/success?reference=${payment.payment_reference}`
        );

      }

    } catch (err) {
      console.error(err);
    }

  }, 5000);

  return () => clearInterval(interval);

}, [payment, router]);
  async function loadCheckout() {
    try {
      setLoading(true);

      const data = await getCheckout(reference as string);

      setCheckout(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function startPayment() {
    if (!checkout) return;

    try {
      setInitializing(true);

      const data = await initializeCheckoutPayment(
        checkout.checkout_reference
      );
console.log("Payment Response:", data);
      setPayment(data);

    } catch (err: any) {

  if (err.message === "Checkout session has expired.") {
    setExpired(true);
    return;
  }

  alert(err.message);

} finally {
      setInitializing(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading checkout...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }
if (expired) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">

        <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center">
          <span className="text-red-600 text-3xl">✕</span>
        </div>

        <h1 className="text-3xl font-bold mt-6">
          Checkout Expired
        </h1>

        <p className="text-gray-500 mt-3">
          This checkout session has expired.
        </p>

        <p className="text-gray-500 mt-1">
          Please request a new payment link from the merchant.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-8 w-full bg-black text-white rounded-lg py-3"
        >
          Refresh
        </button>

      </div>
    </main>
  );
}
  if (!checkout) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Checkout not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center">
          OmniPay
        </h1>

        <p className="text-center text-gray-500 mt-1">
          {checkout.merchant_name}
        </p>

        <hr className="my-6" />

        <h2 className="font-semibold">
          {checkout.description}
        </h2>

        <p className="text-gray-500 mt-1">
          {checkout.invoice_number}
        </p>

        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Amount
          </p>

          <p className="text-3xl font-bold">
            ₦{checkout.amount.toLocaleString()}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            ≈ {checkout.original_currency}{" "}
            {checkout.original_amount}
          </p>
        </div>

        <div className="mt-6">
          <p className="font-medium">
            Customer
          </p>

          <p>
            {checkout.invoices.customer_name}
          </p>

          <p className="text-gray-500">
            {checkout.invoices.customer_email}
          </p>
        </div>

        {!payment && (
          <button
            onClick={startPayment}
            disabled={initializing}
            className="w-full rounded-lg bg-black text-white py-3 mt-8"
          >
            {initializing
              ? "Initializing..."
              : "Continue to Payment"}
          </button>
        )}

        {payment && (
          <div className="mt-8 border rounded-lg p-5">

            <h3 className="font-semibold text-lg">
              Bank Transfer Details
            </h3>

            <div className="mt-5">
              <p className="text-sm text-gray-500">
                Account Number
              </p>

              <p className="text-2xl font-bold">
                {payment.provider_data.account_number}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Bank
              </p>

              <p>
                {payment.provider_data.bank_name}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Account Name
              </p>

              <p>
                {payment.provider_data.account_name}
              </p>
            </div>

            <div className="mt-6 rounded-lg bg-yellow-50 border border-yellow-200 p-4">

              <p className="font-medium">
                Waiting for payment...
              </p>

              <p className="text-sm text-gray-600 mt-1">
                Transfer the exact amount to the account above. This page will automatically update after payment in the next step.
              </p>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}