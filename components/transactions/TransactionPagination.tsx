interface Props {
  pagination: {
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };

  onPageChange: (page: number) => void;
}

export default function TransactionPagination({
  pagination,
  onPageChange,
}: Props) {
  return (
    <div className="mt-6 flex items-center justify-between">

      <button
        disabled={!pagination.hasPreviousPage}
        onClick={() => onPageChange(pagination.page - 1)}
        className="rounded-lg border px-4 py-2 disabled:opacity-50"
      >
        Previous
      </button>

      <p className="text-sm text-slate-500">
        Page {pagination.page} of {pagination.totalPages}
      </p>

      <button
        disabled={!pagination.hasNextPage}
        onClick={() => onPageChange(pagination.page + 1)}
        className="rounded-lg border px-4 py-2 disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
}