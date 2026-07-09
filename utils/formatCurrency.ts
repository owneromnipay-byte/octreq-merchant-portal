export function formatCurrency(
  amount: number | string,
  currency = "₦"
): string {
  return `${currency}${Number(amount).toLocaleString()}`;
}