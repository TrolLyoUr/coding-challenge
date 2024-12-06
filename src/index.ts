import { readFileSync } from "fs";
import { join } from "path";
import { calculateRevenue } from "./calculations";
import { formatCurrency } from "./utils";

// Read and parse data
const rawData = readFileSync(join(__dirname, "..", "data.json"), "utf8");
const data = JSON.parse(rawData);

// Perform calculations
const revenue = calculateRevenue(data);

// Print results
console.log(`Revenue: ${formatCurrency(revenue)}`);
