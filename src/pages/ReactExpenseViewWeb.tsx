import { useState, useEffect } from "react";
import { getExpenses } from "../services/expenseService";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { FormControl, InputLabel, MenuItem, Box } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
  StyledTableHead,
} from "../styles/tableStyles.ts";

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
  const [month, setMonth] = useState("");

  const expenseKeys = ["ID", "DESCRIÇÃO", "CATEGORIA", "VALOR", "MÊS", "DIA"];

  const handleChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value as string);
  };

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
      <Box style={{ width: "40%", padding: "20px" }}>
        <FormControl fullWidth>
          <InputLabel id="select-month-label">Month</InputLabel>
          <Select
            labelId="select-month-label"
            id="select-month"
            value={month}
            label="Month"
            onChange={handleChange}
          >
            {monthArray.map((month, index) => (
              <MenuItem key={index} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
            {rows.map((row) => (
              <StyledTableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="right">{row.descricao}</StyledTableCell>
                <StyledTableCell align="right">{row.categoria}</StyledTableCell>
                <StyledTableCell align="right">{row.valor}</StyledTableCell>
                <StyledTableCell align="right">{row.mes}</StyledTableCell>
                <StyledTableCell align="right">{row.dia}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </>
  );
}
