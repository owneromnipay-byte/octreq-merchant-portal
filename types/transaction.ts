export interface Transaction {
  id: string;
  merchant_id?: string;
  invoice_id?: string;

  payment_reference: string;
  provider_reference?: string;

  provider: string;

  transaction_type: string;

  amount: number;

  currency: string;

  status: "SUCCESS" | "PENDING" | "FAILED" | "PROCESSING";

  description?: string;

  created_at: string;

  updated_at?: string;

  metadata?: Record<string, any>;
}