import type { Transaction } from "@/types/transaction";

import StatusBadge from "./StatusBadge";

import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  return (
    <div className="mt-10 rounded-xl bg-white shadow">

      <div className="flex items-center justify-between border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          Recent Transactions
        </h2>

        <span className="text-sm text-slate-500">
          {transactions.length} transaction(s)
        </span>
      </div>

      {transactions.length === 0 ? (
        <div className="p-10 text-center text-slate-500">
          No transactions yet.
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Reference
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Amount
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Provider
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {transactions.map((transaction) => (

                <tr
                  key={transaction.id}
                  className="border-t transition hover:bg-slate-50"
                >

                  <td className="px-6 py-4 font-medium">
                    {transaction.payment_reference}
                  </td>

                  <td className="px-6 py-4">
                    {formatCurrency(transaction.amount)}
                  </td>

                  <td className="px-6 py-4 capitalize">
                    {transaction.provider}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={transaction.status} />
                  </td>

                  <td className="px-6 py-4 text-slate-500">
                    {formatDate(transaction.created_at)}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}