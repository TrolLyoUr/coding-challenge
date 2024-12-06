/**
 * @fileoverview Test suite for utility formatting functions
 * Tests currency and percentage formatting with various scenarios including
 * edge cases and different number formats
 */

import { formatCurrency, formatPercentage } from "../src/utils";

describe("Utils Tests", () => {
  /**
   * Tests for currency formatting function
   * Verifies:
   * - Whole number formatting with thousands separators
   * - Decimal number handling (rounding)
   * - Small number formatting
   * - Currency symbol placement
   */
  describe("formatCurrency", () => {
    /**
     * Tests formatting of whole numbers
     * Expected format: "$X,XXX" where X are digits
     * Verifies:
     * - Correct placement of thousands separators
     * - Dollar sign prefix
     * - No decimal places
     */
    it("should format a whole number without decimals", () => {
      expect(formatCurrency(1000)).toBe("$1,000");
      expect(formatCurrency(999999)).toBe("$999,999");
    });

    /**
     * Tests decimal number handling
     * Verifies that numbers with decimals are rounded down
     * Example: 1234.56 -> "$1,234"
     */
    it("should round down if a number is provided with decimals", () => {
      expect(formatCurrency(1234.56)).toBe("$1,234");
    });

    /**
     * Tests handling of small numbers (< 1000)
     * Verifies:
     * - No thousands separator needed
     * - Correct formatting with dollar sign
     */
    it("should handle small numbers", () => {
      expect(formatCurrency(5)).toBe("$5");
    });
  });

  /**
   * Tests for percentage formatting function
   * Verifies:
   * - Decimal place handling
   * - Percentage symbol placement
   * - Rounding behavior
   * - Edge cases (0 and large numbers)
   */
  describe("formatPercentage", () => {
    /**
     * Tests standard percentage formatting
     * Expected format: "XX.X%" where X are digits
     * Verifies:
     * - One decimal place
     * - Correct rounding
     * - Percentage symbol suffix
     */
    it("should format a percentage to one decimal place with a % sign", () => {
      expect(formatPercentage(50)).toBe("50.0%");
      expect(formatPercentage(99.9999)).toBe("100.0%"); // Tests rounding
    });

    /**
     * Tests edge cases for percentage formatting
     * Verifies handling of:
     * - Zero values
     * - Very large numbers
     * - Correct decimal place maintenance
     */
    it("should handle small and large values gracefully", () => {
      expect(formatPercentage(0)).toBe("0.0%");
      expect(formatPercentage(1234.5678)).toBe("1234.6%");
    });
  });
});
