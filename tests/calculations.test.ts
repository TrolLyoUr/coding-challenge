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

describe("calculations", () => {
  describe("calculateRevenue", () => {
    it("should calculate revenue correctly for valid data", () => {
      const result = calculateRevenue(mockData);
      expect(result).toBe(1200); // 1000 + 200
    });

    it("should return 0 for empty data", () => {
      expect(calculateRevenue([])).toBe(0);
    });

    it("should warn and return 0 for invalid input", () => {
      const consoleSpy = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {});
      expect(calculateRevenue(null as unknown as DataItem[])).toBe(0);
      expect(consoleSpy).toHaveBeenCalledWith(
        "Invalid input: data is not an array. Returning 0 for revenue."
      );
      consoleSpy.mockRestore();
    });
  });
});
