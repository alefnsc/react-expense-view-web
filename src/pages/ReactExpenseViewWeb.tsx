import { useState, useEffect } from "react";
import { getExpenses } from "../services/expenseService";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { FormControl, InputLabel, MenuItem, Box } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useParams } from "react-router-dom";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
  StyledTableHead,
} from "../styles/tableStyles.ts";
import { useNavigate } from "react-router-dom";

interface Expense {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

function createData({ id, descricao, categoria, valor, mes, dia }: Expense) {
  return { id, descricao, categoria, valor, mes, dia };
}

export default function ReactExpenseViewWeb() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [rows, setRows] = useState<Expense[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [yearArray, setYearArray] = useState<string[]>([]);
  const [totalExpenses, setTotalExpenses] = useState("0");

  const { month } = useParams<{ month: string }>();

  const expenseKeys = ["DESCRIPTION", "CATEGORY", "VALUE", "MONTH", "DAY"];

  const handleYearChange = (event: SelectChangeEvent) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event: SelectChangeEvent) => {
    setSelectedMonth(event.target.value);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedMonth !== "" && selectedYear !== "") {
      navigate(`/expenses/${selectedYear}-${selectedMonth}`);
    }
  }, [selectedMonth, selectedYear, navigate]);

  useEffect(() => {
    const newRows = expenses
      .filter((expense) => {
        return expense.mes === month;
      })
      .map((expense) => createData(expense));
    const totalYearMonthExpenses = newRows
      .reduce((total, expense) => total + expense.valor, 0)
      .toLocaleString("en-US");
    setTotalExpenses(totalYearMonthExpenses);
    setRows(newRows);
  }, [expenses, month]);

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

  const monthArray = [
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
  return (
    <>
      <Box
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "row",
          margin: "5px",
          justifyContent: "space-between",
        }}
      >
        <Box
          style={{
            width: "40%",
            display: "flex",
          }}
        >
          <FormControl
            fullWidth
            style={{
              margin: "5px",
            }}
          >
            <InputLabel id="select-month-label">Year</InputLabel>
            <Select
              labelId="select-month-label"
              id="select-month"
              value={selectedYear}
              label="Month"
              onChange={handleYearChange}
            >
              {yearArray.map((year, index) => (
                <MenuItem key={index} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            style={{
              margin: "5px",
            }}
          >
            <InputLabel id="select-month-label">Month</InputLabel>
            <Select
              labelId="select-month-label"
              id="select-month"
              value={selectedMonth}
              label="Month"
              onChange={handleMonthChange}
            >
              {monthArray.map((month, index) => (
                <MenuItem
                  key={index}
                  value={(index + 1).toString().padStart(2, "0")}
                >
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <b style={{ margin: "10px" }}>Total Expenses:</b>
          <span>{totalExpenses}</span>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <StyledTable
          sx={{ minWidth: 650, width: "100%" }}
          aria-label="simple table"
        >
          <StyledTableHead>
            <StyledTableRow>
              {expenseKeys.map((key) => (
                <StyledTableCell style={{ fontWeight: "bold" }} key={key}>
                  {key}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </StyledTableHead>
          <TableBody>
            {rows &&
              rows.map((row) => (
                <StyledTableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell>{row.descricao}</StyledTableCell>
                  <StyledTableCell>{row.categoria}</StyledTableCell>
                  <StyledTableCell>
                    {row.valor.toFixed(2).toString().toLocaleString("en-US")}
                  </StyledTableCell>
                  <StyledTableCell>{row.mes.split("-")[1]}</StyledTableCell>
                  <StyledTableCell>{row.dia}</StyledTableCell>
                </StyledTableRow>
              ))}
            {rows.length < 1 && (
              <StyledTableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell
                  style={{
                    color: "red",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                  colSpan={5}
                  align="center"
                >
                  No expenses found for the selected period.
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </>
  );
}
