export interface Payout {
  id: string;

  merchant_id: string;

  amount: number;
  currency: string;

  bank_name: string;
  bank_code: string;

  account_number: string;
  account_name: string;

  provider: string;
  provider_reference: string;

  status:
    | "PENDING"
    | "SUCCESS"
    | "FAILED";

  created_at: string;
  updated_at: string;
}