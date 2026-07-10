"use client";

interface Props {
  search: string;
  status: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function InvoiceFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-6 shadow md:flex-row">

      <input
        type="text"
        placeholder="Search invoice..."
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
        <option value="PAID">Paid</option>
        <option value="PENDING">Pending</option>
        <option value="FAILED">Failed</option>
        <option value="EXPIRED">Expired</option>
      </select>

    </div>
  );
}