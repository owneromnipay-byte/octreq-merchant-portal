"use client";

interface Props {
  search: string;
  type: string;

  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export default function LedgerFilters({
  search,
  type,
  onSearchChange,
  onTypeChange,
}: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-6 shadow md:flex-row">

      <input
        type="text"
        placeholder="Search by reference or description..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-black"
      />

      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
        className="rounded-lg border border-slate-300 px-4 py-2"
      >
        <option value="">All Types</option>
        <option value="CREDIT">Credit</option>
        <option value="DEBIT">Debit</option>
      </select>

    </div>
  );
}