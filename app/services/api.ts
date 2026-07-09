const API_BASE = "http://localhost:3000/api";

/**
 * Login
 */
export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

/**
 * Dashboard
 */
export async function getDashboard(token: string) {
  const response = await fetch(`${API_BASE}/dashboard`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
}

/**
 * Transactions
 */

interface TransactionFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  transactionType?: string;
}

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

  const response = await fetch(
    `${API_BASE}/transactions?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

/**
 * Wallet
 */
export async function getWallet(token: string) {
  const response = await fetch(`${API_BASE}/wallet`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
}