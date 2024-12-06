export function formatCurrency(value: number): string {
  const rounded = Math.floor(value);
  return "$" + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatPercentage(value: number): string {
  return value.toFixed(1) + "%";
}
