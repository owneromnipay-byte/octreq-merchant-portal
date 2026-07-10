"use client";

interface Props {
  search: string;
  status: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function PayoutFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-6 shadow md:flex-row">

      <input
        type="text"
        placeholder="Search recipient, account or reference..."
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
        <option value="PENDING">Pending</option>
        <option value="SUCCESS">Success</option>
        <option value="FAILED">Failed</option>
      </select>

    </div>
  );
}