"use client";

import type { Payout } from "@/types/payout";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

interface Props {
  payouts: Payout[];
  onRowClick?: (payout: Payout) => void;
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

export default function PayoutTable({
  payouts,
  onRowClick,
}: Props) {
  return (
    <Card>

      <CardHeader>
        <CardTitle>Payouts</CardTitle>
      </CardHeader>

      <CardContent>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="py-3 text-left">
                  Recipient
                </th>

                <th className="py-3 text-left">
                  Bank
                </th>

                <th className="py-3 text-left">
                  Amount
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

              {payouts.map((payout) => (

                <tr
                  key={payout.id}
                  onClick={() => onRowClick?.(payout)}
                  className="cursor-pointer border-b transition-colors hover:bg-slate-50"
                >

                  <td className="py-4">
                    {payout.account_name}
                  </td>

                  <td className="py-4">
                    {payout.bank_name}
                  </td>

                  <td className="py-4">
                    {formatCurrency(payout.amount)}
                  </td>

                  <td className="py-4">
                    <Badge
                      variant={getStatusVariant(payout.status)}
                    >
                      {payout.status}
                    </Badge>
                  </td>

                  <td className="py-4">
                    {formatDate(payout.created_at)}
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