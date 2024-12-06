import { DataItem } from "../types";

function sumByCondition(
  data: DataItem[],
  conditionFn: (item: DataItem) => boolean
): number {
  return data
    .filter(conditionFn)
    .reduce((acc, cur) => acc + cur.total_value, 0);
}

export function calculateRevenue(data: DataItem[]): number {
  return sumByCondition(data, (item) => item.account_category === "revenue");
}

export function calculateExpenses(data: DataItem[]): number {
  return sumByCondition(data, (item) => item.account_category === "expense");
}
