const API_BASE = "https://api.octoreq.com/api";

interface TransactionFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  transactionType?: string;
}

/**
 * Shared API Request Helper
 */
async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const response = await fetch(`${API_BASE}${endpoint}`, options);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}

/**
 * Login
 */
export async function login(email: string, password: string) {
  return apiRequest("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

/**
 * Dashboard
 */
export async function getDashboard(token: string) {
  const data = await apiRequest("/dashboard", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
}

/**
 * Transactions
 */
export async function getTransactions(
  token: string,
  filters: TransactionFilters = {}
) {
  const params = new URLSearchParams();

  params.set("page", String(filters.page ?? 1));
  params.set("limit", String(filters.limit ?? 20));

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.status) {
    params.set("status", filters.status);
  }

  if (filters.transactionType) {
    params.set("transaction_type", filters.transactionType);
  }

  return apiRequest(
    `/transactions?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/**
 * Wallet
 */
export async function getWallet(token: string) {
  const data = await apiRequest("/wallet", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
}
/**
 * Ledger
 */
export async function getLedger(
  token: string,
  page = 1,
  limit = 10
) {
  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("limit", String(limit));

  const data = await apiRequest(
    `/ledger?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return {
    ledger: data.ledger,
    pagination: data.pagination,
    summary: data.summary,
  };
}
interface InvoiceFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

/**
 * Invoices
 */
export async function getInvoices(
  token: string,
  filters: InvoiceFilters = {}
) {
  const params = new URLSearchParams();

  params.set("page", String(filters.page ?? 1));
  params.set("limit", String(filters.limit ?? 10));

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.status) {
    params.set("status", filters.status);
  }

  const data = await apiRequest(
    `/invoices?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return {
    invoices: data.invoices,
    pagination: data.pagination,
  };
}
/**
 * Create Invoice
 */
export async function createInvoice(
  token: string,
  payload: {
    customer_name: string;
    customer_email: string;
    amount: number;
    currency: string;
    description: string;
  }
) {
  const data = await apiRequest("/invoices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  return data.invoice;
}
interface PayoutFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

/**
 * Payouts
 */
export async function getPayouts(
  token: string,
  filters: PayoutFilters = {}
) {
  const params = new URLSearchParams();

  params.set("page", String(filters.page ?? 1));
  params.set("limit", String(filters.limit ?? 10));

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.status) {
    params.set("status", filters.status);
  }

  const data = await apiRequest(
    `/payouts?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return {
    payouts: data.payouts,
    pagination: data.pagination,
  };
}
/**
 * Create Payout
 */
export async function createPayout(
  token: string,
  payload: {
    amount: number;
    currency: string;
    bank_name: string;
    bank_code: string;
    account_number: string;
    account_name: string;
  }
) {
  const data = await apiRequest("/payouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  return data.data;
}