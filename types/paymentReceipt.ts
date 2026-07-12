export interface PaymentReceipt {
  payment_reference: string;
  payment_method: string;
  status: string;
  amount: number;
  currency: string;
  paid_at: string;

  merchant: {
    id: string;
    name: string;
    email: string;
  };

  customer: {
    name: string;
    email: string;
  };

  invoice: {
    id: string;
    number: string;
    description: string;
  };
}