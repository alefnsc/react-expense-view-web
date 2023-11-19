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
