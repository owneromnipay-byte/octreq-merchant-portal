"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";
import TableSkeleton from "@/components/ui/TableSkeleton";
import InvoiceTable from "@/components/invoice/InvoiceTable";
import InvoiceFilters from "@/components/invoice/InvoiceFilters";
import InvoiceDetailsModal from "@/components/invoice/invoiceDetailsModal";
import CreateInvoiceModal from "@/components/invoice/CreateInvoiceModal";
import EmptyState from "@/components/ui/EmptyState";
import { Receipt } from "lucide-react";
import TransactionPagination from "@/components/transactions/TransactionPagination";

import type { Invoice } from "@/types/invoice";

import { getInvoices } from "../services/api";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [pagination, setPagination] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [selectedInvoice, setSelectedInvoice] =
    useState<Invoice | null>(null);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  useEffect(() => {
    loadInvoices(1);
  }, [search, status]);

  async function loadInvoices(page: number) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const data = await getInvoices(token, {
        page,
        limit: 10,
        search,
        status,
      });

      setInvoices(data.invoices);
      setPagination(data.pagination);

    } catch (error) {
      console.error(error);

      localStorage.removeItem("token");
      localStorage.removeItem("merchant");

      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  }

 if (loading) {
  return (
    <AppLayout>
      <TableSkeleton />
    </AppLayout>
  );
}
  return (
    <AppLayout>

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Invoices
          </h1>

          <p className="mt-2 text-slate-500">
            Manage customer invoices.
          </p>

        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
        >
          + New Invoice
        </button>

      </div>

      <div className="mt-8">

        <InvoiceFilters
          search={search}
          status={status}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
        />

        {invoices.length === 0 ? (
  <EmptyState
    icon={Receipt}
    title="No invoices yet"
    description="Create your first invoice to start receiving payments."
  />
) : (
  <InvoiceTable
    invoices={invoices}
    onRowClick={(invoice: any) => setSelectedInvoice(invoice)}
  />
)}

        {pagination && (
          <TransactionPagination
            pagination={pagination}
            onPageChange={loadInvoices}
          />
        )}

      </div>

      <InvoiceDetailsModal
        invoice={selectedInvoice}
        open={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />

      <CreateInvoiceModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => loadInvoices(1)}
      />

    </AppLayout>
  );
}