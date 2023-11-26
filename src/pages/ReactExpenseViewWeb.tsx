import { useState, useEffect, useMemo, useCallback } from "react";
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

export default function ReactExpenseViewWeb() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [rows, setRows] = useState<Expense[]>([]);
  const [categoryRows, setCategoryRows] = useState<ExpenseCategory[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [yearArray, setYearArray] = useState<string[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [selectedTab, setSelectedTab] = useState("Summary");

  const { month } = useParams<{ month: string }>();

  const navigate = useNavigate();

  const handleYearChange = useCallback((event: SelectChangeEvent): void => {
    setSelectedYear(event.target.value);
  }, []);

  const handleMonthChange = useCallback((event: SelectChangeEvent): void => {
    const monthNumber = (monthArray.indexOf(event.target.value) + 1)
      .toString()
      .padStart(2, "0");
    setSelectedMonth(monthNumber);
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
    setRows(newRows);
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

      setCategoryRows(newRows);
    }
  }, [selectedTab, rows]);

  // Calculate total expenses
  useEffect(() => {
    setTotalExpenses(getTotalExpenses(rows));
  }, [rows]);

  // Fetch expenses from API
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        const spreadData = [...data];
        setExpenses(spreadData as Expense[]);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    if (expenses.length === 0) {
      fetchExpenses();
    } else {
      const newRows = expenses.map((expense) => createData(expense));
      setRows(newRows);
      const yearArrayData = [
        ...new Set(expenses.map((expense) => expense.mes.split("-")[0])),
      ];
      setYearArray(yearArrayData);
    }
  }, [expenses]);

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
          onChange={(event, newValue) => setSelectedTab(newValue)}
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
