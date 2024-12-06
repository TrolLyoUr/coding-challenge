/**
 * @fileoverview Test suite for financial calculations
 * Tests all accounting metric calculations with various scenarios including
 * edge cases and error conditions
 */

import {
  calculateRevenue,
  calculateExpenses,
  calculateGrossProfitMargin,
  calculateNetProfitMargin,
  calculateWorkingCapitalRatio,
} from "../src/calculations";
import { DataItem } from "../types";

/**
 * Mock financial data for testing
 * Includes various types of financial entries:
 * - Revenue entries (sales and other)
 * - Expense entries
 * - Asset entries (current and bank)
 * - Liability entries
 * Each entry includes both debit and credit transactions
 */
const mockData: DataItem[] = [
  {
    account_category: "revenue",
    account_type: "sales",
    value_type: "debit",
    total_value: 1000,
  },
  {
    account_category: "revenue",
    account_type: "other",
    value_type: "credit",
    total_value: 500,
  },
  {
    account_category: "expense",
    account_type: "cost",
    value_type: "debit",
    total_value: 300,
  },
  {
    account_category: "assets",
    account_type: "current",
    value_type: "debit",
    total_value: 2000,
  },
  {
    account_category: "assets",
    account_type: "bank",
    value_type: "credit",
    total_value: 500,
  },
  {
    account_category: "liability",
    account_type: "current",
    value_type: "credit",
    total_value: 1000,
  },
  {
    account_category: "liability",
    account_type: "current",
    value_type: "debit",
    total_value: 200,
  },
];

/**
 * Mock data representing a scenario with no revenue entries
 * Used for testing edge cases where revenue is zero
 */
const mockDataWithZeroRevenue: DataItem[] = [
  {
    account_category: "expense",
    account_type: "cost",
    value_type: "debit",
    total_value: 300,
  },
];

/**
 * Mock data representing a scenario with no liability entries
 * Used for testing edge cases where liabilities are zero
 */
const mockDataWithZeroLiabilities: DataItem[] = [
  {
    account_category: "assets",
    account_type: "current",
    value_type: "debit",
    total_value: 1500,
  },
  {
    account_category: "assets",
    account_type: "bank",
    value_type: "credit",
    total_value: 500,
  },
];

describe("calculations", () => {
  /**
   * Tests for revenue calculation
   * Verifies:
   * - Correct summation of revenue entries
   * - Handling of scenarios with no revenue
   */
  describe("calculateRevenue", () => {
    it("should calculate total revenue correctly", () => {
      const result = calculateRevenue(mockData);
      expect(result).toBe(1500); // 1000 + 500
    });

    it("should return 0 when no revenue exists", () => {
      const result = calculateRevenue(mockDataWithZeroRevenue);
      expect(result).toBe(0);
    });
  });

  /**
   * Tests for expense calculation
   * Verifies correct summation of expense entries
   */
  describe("calculateExpenses", () => {
    it("should calculate total expenses correctly", () => {
      const result = calculateExpenses(mockData);
      expect(result).toBe(300); // Only one expense record
    });
  });

  /**
   * Tests for gross profit margin calculation
   * Verifies:
   * - Correct calculation of the margin percentage
   * - Error handling for zero revenue
   * Formula tested: (Sales Revenue / Total Revenue) * 100
   */
  describe("calculateGrossProfitMargin", () => {
    it("should calculate gross profit margin correctly", () => {
      const revenue = calculateRevenue(mockData);
      const result = calculateGrossProfitMargin(mockData, revenue);
      expect(result).toBeCloseTo(66.7, 1); // (1000 / 1500) * 100
    });

    it("should throw an error when revenue is 0", () => {
      expect(() => {
        calculateGrossProfitMargin(mockDataWithZeroRevenue, 0);
      }).toThrow(
        "Gross Profit Margin calculation is undefined: revenue is zero."
      );
    });
  });

  /**
   * Tests for net profit margin calculation
   * Verifies:
   * - Correct calculation of the margin percentage
   * - Error handling for zero revenue
   * Formula tested: ((Revenue - Expenses) / Revenue) * 100
   */
  describe("calculateNetProfitMargin", () => {
    it("should calculate net profit margin correctly", () => {
      const revenue = calculateRevenue(mockData);
      const expenses = calculateExpenses(mockData);
      const result = calculateNetProfitMargin(revenue, expenses);
      expect(result).toBeCloseTo(80.0, 1); // ((1500 - 300) / 1500) * 100
    });

    it("should throw an error when revenue is 0", () => {
      expect(() => {
        calculateNetProfitMargin(0, 300);
      }).toThrow(
        "Net Profit Margin calculation is undefined: revenue is zero."
      );
    });
  });

  /**
   * Tests for working capital ratio calculation
   * Verifies:
   * - Correct calculation of the ratio percentage
   * - Error handling for zero liabilities
   * Formula tested: (Current Assets / Current Liabilities) * 100
   *
   * Assets calculation: Debits - Credits
   * Liabilities calculation: Credits - Debits
   */
  describe("calculateWorkingCapitalRatio", () => {
    it("should calculate working capital ratio correctly", () => {
      const result = calculateWorkingCapitalRatio(mockData);
      const assets = 2000 - 500; // 1500 (debits - credits)
      const liabilities = 1000 - 200; // 800 (credits - debits)
      expect(result).toBeCloseTo((assets / liabilities) * 100, 1); // (1500 / 800) * 100
    });

    it("should throw an error when liabilities are 0", () => {
      expect(() => {
        calculateWorkingCapitalRatio(mockDataWithZeroLiabilities);
      }).toThrow(
        "Working Capital Ratio calculation is undefined: liabilities are zero."
      );
    });
  });
});
