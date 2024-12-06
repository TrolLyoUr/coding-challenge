import { formatCurrency, formatPercentage } from "../src/utils";

describe("Utils Tests", () => {
  describe("formatCurrency", () => {
    it("should format a whole number without decimals", () => {
      expect(formatCurrency(1000)).toBe("$1,000");
      expect(formatCurrency(999999)).toBe("$999,999");
    });

    it("should round down if a number is provided with decimals", () => {
      expect(formatCurrency(1234.56)).toBe("$1,234");
    });

    it("should handle small numbers", () => {
      expect(formatCurrency(5)).toBe("$5");
    });
  });

  describe("formatPercentage", () => {
    it("should format a percentage to one decimal place with a % sign", () => {
      expect(formatPercentage(50)).toBe("50.0%");
      expect(formatPercentage(99.9999)).toBe("100.0%");
    });

    it("should handle small and large values gracefully", () => {
      expect(formatPercentage(0)).toBe("0.0%");
      expect(formatPercentage(1234.5678)).toBe("1234.6%");
    });
  });
});
