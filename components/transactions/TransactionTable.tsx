"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Transaction {
  id: string;
  payment_reference: string;
  provider: string;
  amount: number;
  status: string;
  created_at: string;
}

interface Props {
  transactions: Transaction[];
}

function getStatusVariant(status: string) {
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
}: Props) {
  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Recent Transactions
        </CardTitle>

      </CardHeader>

      <CardContent>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="py-3 text-left">
                  Reference
                </th>

                <th className="py-3 text-left">
                  Amount
                </th>

                <th className="py-3 text-left">
                  Provider
                </th>

                <th className="py-3 text-left">
                  Status
                </th>

                <th className="py-3 text-left">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {transactions.map((transaction) => (

                <tr
                  key={transaction.id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="py-4">
                    {transaction.payment_reference}
                  </td>

                  <td className="py-4">
                    ₦{Number(transaction.amount).toLocaleString()}
                  </td>

                  <td className="py-4 capitalize">
                    {transaction.provider}
                  </td>

                  <td className="py-4">

                    <Badge
                      variant={getStatusVariant(transaction.status)}
                    >
                      {transaction.status}
                    </Badge>

                  </td>

                  <td className="py-4">
                    {new Date(
                      transaction.created_at
                    ).toLocaleDateString()}
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