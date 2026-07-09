export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col">

      <div>
        <h1 className="text-2xl font-bold text-green-400">
          OmniPay
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Merchant Portal
        </p>
      </div>

      <nav className="mt-10 space-y-3">

        <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800">
          Dashboard
        </button>

        <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800">
          Wallet
        </button>

        <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800">
          Transactions
        </button>

        <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800">
          Invoices
        </button>

        <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800">
          Payouts
        </button>

        <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800">
          Developers
        </button>

        <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800">
          Settings
        </button>

      </nav>

    </aside>
  );
}