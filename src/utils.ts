/**
 * Formats a number as a currency string with USD symbol and thousands separators
 * @param value - The number to format
 * @returns Formatted currency string (e.g., "$1,234")
 */
export function formatCurrency(value: number): string {
  const rounded = Math.floor(value);
  return "$" + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Formats a number as a percentage string with one decimal place
 * @param value - The number to format
 * @returns Formatted percentage string (e.g., "12.3%")
 */
export function formatPercentage(value: number): string {
  return value.toFixed(1) + "%";
}
