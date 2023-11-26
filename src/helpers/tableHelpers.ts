import { Expense } from "../types/expenseType";

export const monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function createData({
  id,
  descricao,
  categoria,
  valor,
  mes,
  dia,
}: Expense) {
  return { id, descricao, categoria, valor, mes, dia };
}

export function getTableHeaders(tab: string) {
  if (tab === "Summary") {
    return ["CATEGORY", "VALUE"];
  }
  if (tab === "Detail") {
    return ["DESCRIPTION", "CATEGORY", "VALUE", "MONTH", "DAY"];
  }
}

export function getTotalExpenses(rows: Expense[]) {
  return rows.reduce((total, expense) => total + expense.valor, 0);
}
