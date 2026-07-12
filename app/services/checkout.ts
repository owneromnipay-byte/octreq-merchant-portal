const API_BASE = "http://localhost:3000/api";

async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const response = await fetch(
    `${API_BASE}${endpoint}`,
    options
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong."
    );
  }

  return data;
}

// =====================================
// GET CHECKOUT
// =====================================

export async function getCheckout(
  reference: string
) {
  const data = await apiRequest(
    `/checkout/${reference}`,
    {
      method: "GET",
    }
  );

  return data.data;
}

// =====================================
// INITIALIZE PAYMENT
// =====================================

export async function initializeCheckoutPayment(
  checkoutReference: string,
  provider: string = "auto"
) {
  const data = await apiRequest(
    `/checkout/payment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checkoutReference,
        provider,
      }),
    }
  );

  return data.data;
}

// =====================================
// GET PAYMENT STATUS
// =====================================

export async function getPaymentStatus(
  paymentReference: string
) {
  const data = await apiRequest(
    `/payment-status/${paymentReference}/status`,
    {
      method: "GET",
    }
  );

  return data.data;
}
// =====================================
// PAYMENT RECEIPT
// =====================================

export async function getPaymentReceipt(
  paymentReference: string
) {
  const data = await apiRequest(
    `/payments/${paymentReference}/receipt`,
    {
      method: "GET",
    }
  );

  return data.data;
}