"use client";

import type { Transaction } from "@/types/transaction";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

interface Props {
  transactions: Transaction[];
  onRowClick?: (transaction: Transaction) => void;
}

function getStatusVariant(
  status: string
): "success" | "warning" | "destructive" | "secondary" {
  switch (status) {
    case "SUCCESS":
      return "success";

    case "PENDING":
      return "warning";

    case "FAILED":
      return "destructive";

    default:
      return "secondary";
  }
}

export default function TransactionTable({
  transactions,
  onRowClick,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left">Reference</th>
                <th className="py-3 text-left">Amount</th>
                <th className="py-3 text-left">Provider</th>
                <th className="py-3 text-left">Status</th>
                <th className="py-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  onClick={() => onRowClick?.(transaction)}
                  className="cursor-pointer border-b transition-colors hover:bg-slate-50"
                >
                  <td className="py-4">
                    {transaction.payment_reference}
                  </td>

                  <td className="py-4">
                    {formatCurrency(transaction.amount)}
                  </td>

                  <td className="py-4 capitalize">
                    {transaction.provider}
                  </td>

                  <td className="py-4">
                    <Badge variant={getStatusVariant(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </td>

                  <td className="py-4">
                    {formatDate(transaction.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}