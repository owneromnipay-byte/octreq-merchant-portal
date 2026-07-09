export function formatDate(
  date: string,
  options?: Intl.DateTimeFormatOptions
): string {
  return new Date(date).toLocaleDateString(
    "en-US",
    options
  );
}

export function formatDateTime(
  date: string
): string {
  return new Date(date).toLocaleString();
}