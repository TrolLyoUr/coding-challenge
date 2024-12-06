import { DataItem } from "../types";

/**
 * Helper function to sum values based on a condition
 * @param data - Array of financial data items
 * @param conditionFn - Function to filter items before summing
 * @returns Sum of total_value for items meeting the condition
 * @internal
 */
function sumByCondition(
  data: DataItem[],
  conditionFn: (item: DataItem) => boolean
): number {
  return data
    .filter(conditionFn)
    .reduce((acc, cur) => acc + cur.total_value, 0);
}

/**
 * Calculates total revenue from financial data
 * @param data - Array of financial data items
 * @returns Total revenue value
 * @example
 * const revenue = calculateRevenue(financialData);
 * console.log(revenue); // 150000
 */
export function calculateRevenue(data: DataItem[]): number {
  return sumByCondition(data, (item) => item.account_category === "revenue");
}

/**
 * Calculates total expenses from financial data
 * @param data - Array of financial data items
 * @returns Total expenses value
 * @example
 * const expenses = calculateExpenses(financialData);
 * console.log(expenses); // 75000
 */
export function calculateExpenses(data: DataItem[]): number {
  return sumByCondition(data, (item) => item.account_category === "expense");
}

/**
 * Calculates the gross profit margin as a percentage
 * Formula: (Sales Revenue / Total Revenue) * 100
 * @param data - Array of financial data items
 * @param revenue - Total revenue value
 * @returns Gross profit margin percentage
 * @throws {Error} When revenue is zero
 * @example
 * const grossProfitMargin = calculateGrossProfitMargin(financialData, revenue);
 * console.log(grossProfitMargin); // 65.5
 */
export function calculateGrossProfitMargin(
  data: DataItem[],
  revenue: number
): number {
  if (revenue === 0) {
    throw new Error(
      "Gross Profit Margin calculation is undefined: revenue is zero."
    );
  }

  const salesTotal = sumByCondition(
    data,
    (item) => item.account_type === "sales" && item.value_type === "debit"
  );
  return (salesTotal / revenue) * 100;
}

/**
 * Calculates the net profit margin as a percentage
 * Formula: ((Revenue - Expenses) / Revenue) * 100
 * @param revenue - Total revenue value
 * @param expenses - Total expenses value
 * @returns Net profit margin percentage
 * @throws {Error} When revenue is zero
 * @example
 * const netProfitMargin = calculateNetProfitMargin(revenue, expenses);
 * console.log(netProfitMargin); // 50.0
 */
export function calculateNetProfitMargin(
  revenue: number,
  expenses: number
): number {
  if (revenue === 0) {
    throw new Error(
      "Net Profit Margin calculation is undefined: revenue is zero."
    );
  }

  return ((revenue - expenses) / revenue) * 100;
}

/**
 * Calculates the working capital ratio as a percentage
 * Formula: (Current Assets / Current Liabilities) * 100
 *
 * Current assets include:
 * - Current accounts
 * - Bank accounts
 * - Accounts receivable
 *
 * Current liabilities include:
 * - Current accounts
 * - Accounts payable
 *
 * The calculation considers both debit and credit entries for each category
 *
 * @param data - Array of financial data items
 * @returns Working capital ratio percentage
 * @throws {Error} When liabilities are zero
 * @example
 * const workingCapitalRatio = calculateWorkingCapitalRatio(financialData);
 * console.log(workingCapitalRatio); // 150.0
 */
export function calculateWorkingCapitalRatio(data: DataItem[]): number {
  const validAssetTypes = ["current", "bank", "current_accounts_receivable"];
  const validLiabilityTypes = ["current", "current_accounts_payable"];

  // Calculate net current assets (debits - credits)
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

  // Calculate net current liabilities (credits - debits)
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

  if (liabilities === 0) {
    throw new Error(
      "Working Capital Ratio calculation is undefined: liabilities are zero."
    );
  }

  return (assets / liabilities) * 100;
}
