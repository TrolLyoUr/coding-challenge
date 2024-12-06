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

export function calculateWorkingCapitalRatio(data: DataItem[]): number {
  const validAssetTypes = ["current", "bank", "current_accounts_receivable"];
  const validLiabilityTypes = ["current", "current_accounts_payable"];

  // Assets
  const assetDebits = sumByCondition(
    data,
    (item) =>
      item.account_category === "assets" &&
      item.value_type === "debit" &&
      validAssetTypes.includes(item.account_type)
  );

  const assetCredits = sumByCondition(
    data,
    (item) =>
      item.account_category === "assets" &&
      item.value_type === "credit" &&
      validAssetTypes.includes(item.account_type)
  );

  const assets = assetDebits - assetCredits;

  // Liabilities
  const liabilityCredits = sumByCondition(
    data,
    (item) =>
      item.account_category === "liability" &&
      item.value_type === "credit" &&
      validLiabilityTypes.includes(item.account_type)
  );

  const liabilityDebits = sumByCondition(
    data,
    (item) =>
      item.account_category === "liability" &&
      item.value_type === "debit" &&
      validLiabilityTypes.includes(item.account_type)
  );

  const liabilities = liabilityCredits - liabilityDebits;

  // If liabilities end up being zero after validation and data processing,
  // return 0 to avoid division by zero.
  if (liabilities === 0) {
    return 0;
  }

  return (assets / liabilities) * 100;
}
