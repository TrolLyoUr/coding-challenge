import { DataItem } from "../types";

function sumByCondition(
  data: DataItem[],
  conditionFn: (item: DataItem) => boolean
): number {
  return data
    .filter(conditionFn)
    .reduce((acc, cur) => acc + cur.total_value, 0);
}

export function calculateRevenue(data: DataItem[]): number {
  return sumByCondition(data, (item) => item.account_category === "revenue");
}

export function calculateExpenses(data: DataItem[]): number {
  return sumByCondition(data, (item) => item.account_category === "expense");
}

export function calculateGrossProfitMargin(
  data: DataItem[],
  revenue: number
): number {
  // Assume revenue can be zero if no data present.
  // Return 0 if revenue = 0.

  if (revenue === 0) {
    return 0;
  }

  const salesTotal = sumByCondition(
    data,
    (item) => item.account_type === "sales" && item.value_type === "debit"
  );
  return (salesTotal / revenue) * 100;
}

export function calculateNetProfitMargin(
  revenue: number,
  expenses: number
): number {
  // Assume revenue can be zero if no data present.
  // Return 0 if revenue = 0.
  if (revenue === 0) {
    return 0;
  }

  return ((revenue - expenses) / revenue) * 100;
}
