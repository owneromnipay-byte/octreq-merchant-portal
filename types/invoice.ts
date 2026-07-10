export interface Invoice {
  id: string;
  merchant_id: string;

  invoice_number: string;

  customer_name: string;
  customer_email: string;

  amount: number;
  currency: string;

  payment_method: string;

  status: "PENDING" | "PAID" | "FAILED" | "EXPIRED";

  virtual_account_number: string;
  bank_name: string;

  description: string;

  provider: string;
  provider_reference: string;
  payment_reference: string;

  created_at: string;
  updated_at: string;
}