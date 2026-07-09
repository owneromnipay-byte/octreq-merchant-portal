import AppLayout from "@/components/layout/AppLayout";

export default function Home() {
  return (
    <AppLayout>

      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <p className="text-slate-500 mt-2">
        Welcome back to OmniPay.
      </p>

      <div className="grid grid-cols-4 gap-6 mt-10">

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            Wallet Balance
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            ₦0.00
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            Transactions
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            0
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            Invoices
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            0
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            Payouts
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            0
          </h2>
        </div>

      </div>

    </AppLayout>
  );
}