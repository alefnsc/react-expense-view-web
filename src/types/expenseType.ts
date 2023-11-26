export interface ExpenseCategory {
  id: number | string;
  categoria: string;
  valor: number;
}

export interface Expense extends ExpenseCategory {
  id: number;
  descricao: string;
  mes: string;
  dia: string;
}
