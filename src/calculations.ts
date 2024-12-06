import { DataItem } from "../types";

function sumByCondition(
  data: DataItem[],
  conditionFn: (item: DataItem) => boolean
): number {
  return data.filter(conditionFn).reduce((acc, cur) => {
    const value = Number.isFinite(cur.total_value) ? cur.total_value : 0;
    return acc + value;
  }, 0);
}

export function calculateRevenue(data: DataItem[]): number {
  if (!Array.isArray(data)) {
    console.warn(
      "Invalid input: data is not an array. Returning 0 for revenue."
    );
    return 0;
  }

  if (data.length === 0) {
    return 0;
  }

  return sumByCondition(data, (item) => item.account_category === "revenue");
}
