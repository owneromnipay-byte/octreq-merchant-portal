export interface Checkout {
  id: string;

  checkout_reference: string;

  merchant_name: string;

  invoice_number: string;

  description: string;

  amount: number;

  currency: string;

  original_amount: number;

  original_currency: string;

  exchange_rate: number;

  status: string;

  expires_at: string;

  invoices: {
    payment_reference: string;

    customer_name: string;

    customer_email: string;

    payable_amount: number;

    payable_currency: string;
  };
}

export interface CheckoutPayment {
  payment_reference: string;

  provider: string;

  amount: number;

  currency: string;

  provider_data: {
    account_number: string;

    account_name: string;

    bank_name: string;

    bank_code: string;

    expires_at: string;

    status: string;
  };
}