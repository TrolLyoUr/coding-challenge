import { calculateRevenue } from "../src/calculations";
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
    total_value: 200,
  },
];

test("calculateRevenue", () => {
  expect(calculateRevenue(mockData)).toBe(1200);
});
