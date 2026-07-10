"use client";

// Local Invoice type to avoid missing module error for '@/types/invoice'
type Invoice = {
  id: string;
  invoice_number: string;
  customer_name: string;
  amount: number;
  status: string;
  created_at: string | Date;
};

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
  invoices: Invoice[];
  onRowClick?: (invoice: Invoice) => void;
}

function getStatusVariant(
  status: string
): "success" | "warning" | "destructive" | "secondary" {
  switch (status) {
    case "PAID":
      return "success";

    case "PENDING":
      return "warning";

    case "FAILED":
      return "destructive";

    default:
      return "secondary";
  }
}

export default function InvoiceTable({
  invoices,
  onRowClick,
}: Props) {
  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Invoices
        </CardTitle>

      </CardHeader>

      <CardContent>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="py-3 text-left">
                  Invoice
                </th>

                <th className="py-3 text-left">
                  Customer
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

              {invoices.map((invoice) => (

                <tr
                  key={invoice.id}
                  onClick={() => onRowClick?.(invoice)}
                  className="cursor-pointer border-b transition-colors hover:bg-slate-50"
                >

                  <td className="py-4">
                    {invoice.invoice_number}
                  </td>

                  <td className="py-4">
                    {invoice.customer_name}
                  </td>

                  <td className="py-4">
                    {formatCurrency(invoice.amount)}
                  </td>

                  <td className="py-4">

                    <Badge
                      variant={getStatusVariant(invoice.status)}
                    >
                      {invoice.status}
                    </Badge>

                  </td>

                  <td className="py-4">
                    {formatDate(
                      invoice.created_at instanceof Date
                        ? invoice.created_at.toISOString()
                        : invoice.created_at
                    )}
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