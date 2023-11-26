import { useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, SelectChangeEvent, Tab, Tabs } from "@mui/material";
import { ControlsContainer } from "../components/ControlsContainer.tsx";
import { ControlSelect } from "../components/ControlSelect.tsx";
import { TotalExpense } from "../components/TotalExpense.tsx";
import { ExpenseTable } from "../components/ExpenseTable.tsx";
import { getExpenses } from "../services/backend.ts";
import {
  createData,
  formatCurrency,
  getTotalExpenses,
  monthArray,
} from "../helpers/tableHelpers.ts";
import { Expense, ExpenseCategory } from "../types/expenseType.ts";
import { SelectsContainer } from "../components/SelectsContainer.tsx";
import { useReducer } from "react";

function reducer(
  state: IReactExpenseViewWebState,
  action: IReactExpenseViewWebAction
) {
  switch (action.type) {
    case "LOAD_MONTH_EXPENSES":
      return {
        ...state,
        expenses: action.payload.expenses,
      };
    case "SET_TOTAL_EXPENSES":
      return {
        ...state,
        totalExpenses: action.payload.totalExpenses,
      };
    case "TOTAL_CATEGORY_EXPENSES":
      return {
        ...state,
        categoryRows: action.payload.categoryRows,
      };
    case "TOTAL_DETAIL_EXPENSES":
      return {
        ...state,
        rows: action.payload.rows,
      };
    case "SET_SELECTED_YEAR":
      return {
        ...state,
        selectedYear: action.payload.selectedYear,
      };
    case "SET_SELECTED_MONTH":
      return {
        ...state,
        selectedMonth: action.payload.selectedMonth,
      };
    case "SET_SELECTED_TAB":
      return {
        ...state,
        selectedTab: action.payload.selectedTab,
      };
    case "SET_YEAR_ARRAY":
      return {
        ...state,
        yearArray: action.payload.yearArray,
      };
    case "SET_ROWS":
      return {
        ...state,
        rows: action.payload.rows,
      };
    case "SET_CATEGORY_ROWS":
      return {
        ...state,
        categoryRows: action.payload.categoryRows,
      };

    default:
      return state;
  }
}

type IReactExpenseViewWebAction =
  | { type: "LOAD_MONTH_EXPENSES"; payload: { expenses: Expense[] } }
  | { type: "LOAD_EXPENSES"; payload: { expenses: Expense[] } }
  | { type: "TOTAL_DETAIL_EXPENSES"; payload: { rows: Expense[] } }
  | {
      type: "TOTAL_CATEGORY_EXPENSES";
      payload: { categoryRows: ExpenseCategory[] };
    }
  | { type: "SET_SELECTED_YEAR"; payload: { selectedYear: string } }
  | { type: "SET_YEAR_ARRAY"; payload: { yearArray: string[] } }
  | { type: "SET_SELECTED_MONTH"; payload: { selectedMonth: string } }
  | { type: "SET_SELECTED_TAB"; payload: { selectedTab: string } }
  | { type: "SET_ROWS"; payload: { rows: Expense[] } }
  | { type: "SET_CATEGORY_ROWS"; payload: { categoryRows: ExpenseCategory[] } }
  | { type: "SET_TOTAL_EXPENSES"; payload: { totalExpenses: number } };

interface IReactExpenseViewWebState {
  expenses: Expense[];
  rows: Expense[];
  categoryRows: ExpenseCategory[];
  selectedMonth: string;
  selectedYear: string;
  yearArray: string[];
  totalExpenses: number;
  selectedTab: string;
}

export default function ReactExpenseViewWeb() {
  const [state, dispatch] = useReducer(reducer, {
    expenses: [],
    rows: [],
    categoryRows: [],
    selectedMonth: "",
    selectedYear: "",
    yearArray: [],
    totalExpenses: 0,
    selectedTab: "Summary",
  });

  const {
    expenses,
    rows,
    categoryRows,
    selectedMonth,
    selectedYear,
    yearArray,
    totalExpenses,
    selectedTab,
  } = state;

  const { month } = useParams<{ month: string }>();

  const navigate = useNavigate();

  const handleYearChange = useCallback((event: SelectChangeEvent): void => {
    dispatch({
      type: "SET_SELECTED_YEAR",
      payload: { selectedYear: event.target.value },
    });
  }, []);

  const handleMonthChange = useCallback((event: SelectChangeEvent): void => {
    const monthNumber = (monthArray.indexOf(event.target.value) + 1)
      .toString()
      .padStart(2, "0");
    dispatch({
      type: "SET_SELECTED_MONTH",
      payload: { selectedMonth: monthNumber },
    });
  }, []);

  // Generate path based on selected month and year and navigate to it

  useEffect(() => {
    if (selectedMonth !== "" && selectedYear !== "") {
      navigate(`/expenses/${selectedYear}-${selectedMonth}`);
    }
  }, [selectedMonth, selectedYear, navigate]);

  useMemo(() => {
    const newRows = expenses
      .filter((expense) => {
        return expense.mes === month;
      })
      .map((expense) => createData(expense));
    dispatch({ type: "SET_ROWS", payload: { rows: newRows } });
  }, [expenses, month]);

  useMemo(() => {
    if (selectedTab === "Summary") {
      const newRows = rows.reduce((acc, expense) => {
        const categoryIndex = acc.findIndex(
          (item) => item.categoria === expense.categoria
        );
        if (categoryIndex === -1) {
          acc.push({
            id: expense.categoria,
            categoria: expense.categoria,
            valor: expense.valor,
          });
        } else {
          acc[categoryIndex].valor += expense.valor;
        }
        return acc;
      }, [] as ExpenseCategory[]);
      dispatch({
        type: "SET_CATEGORY_ROWS",
        payload: { categoryRows: newRows },
      });
    }
  }, [selectedTab, rows]);

  // Calculate total expenses
  useEffect(() => {
    const totalExpensesData: number = getTotalExpenses(rows);
    dispatch({
      type: "SET_TOTAL_EXPENSES",
      payload: { totalExpenses: totalExpensesData },
    });
  }, [rows]);

  const setRowsFromExpenses = useCallback(
    (expenses: Expense[]) => {
      const newRows = expenses
        .filter((expense) => expense.mes === month)
        .map((expense) => createData(expense));
      dispatch({ type: "SET_ROWS", payload: { rows: newRows } });
    },
    [month]
  );

  // ...

  useMemo(() => {
    setRowsFromExpenses(expenses);
  }, [expenses, setRowsFromExpenses]);

  // Fetch expenses from API
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data: Expense[] = await getExpenses();
        dispatch({ type: "LOAD_MONTH_EXPENSES", payload: { expenses: data } });
        setRowsFromExpenses(data);
        const yearArrayData = [
          ...new Set(data.map((expense) => expense.mes.split("-")[0])),
        ];
        dispatch({
          type: "SET_SELECTED_YEAR",
          payload: { selectedYear: yearArrayData[0] },
        });
        dispatch({
          type: "SET_YEAR_ARRAY",
          payload: { yearArray: yearArrayData },
        });
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    if (expenses.length === 0) {
      fetchExpenses();
    }
  }, [expenses, setRowsFromExpenses]);

  return (
    <>
      <Box display="flex" justifyContent="flex-end" p={5}></Box>
      <ControlsContainer>
        <SelectsContainer>
          <ControlSelect
            label="Year"
            value={selectedYear}
            options={yearArray}
            onChange={handleYearChange}
          />
          <ControlSelect
            label="Month"
            value={monthArray[parseInt(selectedMonth) - 1] || ""}
            options={monthArray}
            onChange={handleMonthChange}
          />
        </SelectsContainer>
        <TotalExpense totalExpenses={formatCurrency(totalExpenses)} />
      </ControlsContainer>
      <Box className="flex flex-row items-center justify-center">
        <Tabs
          value={selectedTab}
          onChange={(_, newValue) =>
            dispatch({
              type: "SET_SELECTED_TAB",
              payload: { selectedTab: newValue },
            })
          }
          textColor="primary"
          indicatorColor="primary"
          aria-label="Table Tabs"
        >
          <Tab value="Summary" label="Summary" />
          <Tab value="Detail" label="Detail" />
        </Tabs>
      </Box>
      <ExpenseTable
        rows={selectedTab === "Summary" ? categoryRows : rows}
        tab={selectedTab}
      />
    </>
  );
}
