"use client";

interface TransactionFiltersProps {
  search: string;
  status: string;
  transactionType: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onTransactionTypeChange: (value: string) => void;
}

export default function TransactionFilters({
  search,
  status,
  transactionType,
  onSearchChange,
  onStatusChange,
  onTransactionTypeChange,
}: TransactionFiltersProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-6 shadow md:flex-row">

      <input
        type="text"
        placeholder="Search by reference..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-black"
      />

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded-lg border border-slate-300 px-4 py-2"
      >
        <option value="">All Status</option>
        <option value="SUCCESS">Success</option>
        <option value="PENDING">Pending</option>
        <option value="FAILED">Failed</option>
      </select>

      <select
        value={transactionType}
        onChange={(e) => onTransactionTypeChange(e.target.value)}
        className="rounded-lg border border-slate-300 px-4 py-2"
      >
        <option value="">All Types</option>
        <option value="PAYMENT">Payment</option>
        <option value="PAYOUT">Payout</option>
      </select>

    </div>
  );
}