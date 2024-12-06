/**
 * Represents a financial account data item from the general ledger
 * @interface DataItem
 */
export interface DataItem {
  /** Category of the account (e.g., revenue, expense, assets, liability) */
  account_category: string;
  /** Type of the account (e.g., sales, overheads, bank, current) */
  account_type: string;
  /** Type of value entry (debit or credit) */
  value_type: string;
  /** Monetary value of the account entry */
  total_value: number;
}
