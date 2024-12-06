import { readFileSync } from "fs";
import { join } from "path";
import { calculateRevenue } from "./calculations";
import { formatCurrency, formatPercentage } from "./utils";
import { DataItem } from "../types";

// Read and parse data
const rawData = readFileSync(join(__dirname, "..", "data.json"), "utf8");
const parsedData = JSON.parse(rawData);

/**
 * Validate that parsed data is a DataItem[]:
 * - Must be an array.
 * - Each element must have the properties: account_category, account_type, value_type, total_value.
 * - total_value must be a finite number.
 */
function validateData(data: unknown): data is DataItem[] {
  if (!Array.isArray(data)) return false;
  return data.every(
    (item: any) =>
      typeof item === "object" &&
      item !== null &&
      typeof item.account_category === "string" &&
      typeof item.account_type === "string" &&
      typeof item.value_type === "string" &&
      typeof item.total_value === "number" &&
      Number.isFinite(item.total_value)
  );
}

// Extract and validate data from the "data" key
if (
  !parsedData ||
  typeof parsedData !== "object" ||
  !parsedData.hasOwnProperty("data")
) {
  throw new Error('Invalid JSON structure: "data" key is missing.');
}

const data = parsedData["data"];
if (!validateData(data)) {
  throw new Error('Invalid data format in "data" key. Expected DataItem[].');
}

// Perform calculations
const revenue = calculateRevenue(data);

// Print results
console.log(`Revenue: ${formatCurrency(revenue)}`);
