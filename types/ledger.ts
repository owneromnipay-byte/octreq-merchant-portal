export interface LedgerEntry {
  id: string;
  merchant_id: string;
  wallet_id: string;
  transaction_id: string;

  reference: string;

  entry_type: "CREDIT" | "DEBIT";

  amount: number;

  balance_before: number;
  balance_after: number;

  description: string;

  currency: string;

  created_at: string;
}