import {
  calculateRevenue,
  calculateExpenses,
  calculateGrossProfitMargin,
  calculateNetProfitMargin,
  calculateWorkingCapitalRatio,
} from "../src/calculations";
import { DataItem } from "../types";

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

const mockDataWithZeroRevenue: DataItem[] = [
  {
    account_category: "expense",
    account_type: "cost",
    value_type: "debit",
    total_value: 300,
  },
];

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

  describe("calculateExpenses", () => {
    it("should calculate total expenses correctly", () => {
      const result = calculateExpenses(mockData);
      expect(result).toBe(300); // Only one expense record
    });
  });

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
});
