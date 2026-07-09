"use client";

import type { LedgerEntry } from "@/types/ledger";

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
  ledger: LedgerEntry[];
  onRowClick?: (entry: LedgerEntry) => void;
}

export default function LedgerTable({
  ledger,
  onRowClick,
}: Props) {
  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Wallet Ledger
        </CardTitle>

      </CardHeader>

      <CardContent>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="py-3 text-left">Reference</th>
                <th className="py-3 text-left">Type</th>
                <th className="py-3 text-left">Amount</th>
                <th className="py-3 text-left">Balance After</th>
                <th className="py-3 text-left">Date</th>

              </tr>

            </thead>

            <tbody>

              {ledger.map((entry) => (

                <tr
                  key={entry.id}
                  onClick={() => onRowClick?.(entry)}
                  className="cursor-pointer border-b transition-colors hover:bg-slate-50"
                >

                  <td className="py-4">
                    {entry.reference}
                  </td>

                  <td className="py-4">

                    <Badge
                      variant={
                        entry.entry_type === "CREDIT"
                          ? "success"
                          : "destructive"
                      }
                    >
                      {entry.entry_type}
                    </Badge>

                  </td>

                  <td className="py-4">
                    {formatCurrency(entry.amount)}
                  </td>

                  <td className="py-4">
                    {formatCurrency(entry.balance_after)}
                  </td>

                  <td className="py-4">
                    {formatDate(entry.created_at)}
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