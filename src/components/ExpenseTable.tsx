import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
  StyledTableHead,
} from "../styles/tableStyles.ts";
import { Expense } from "../types/expenseType.ts";
import { formatCurrency } from "../helpers/tableHelpers.ts";

interface ExpenseTableProps {
  rows: Expense[];
}

export function ExpenseTable({ rows }: ExpenseTableProps) {
  const tableHeaders = ["DESCRIPTION", "CATEGORY", "VALUE", "MONTH", "DAY"];
  return (
    <TableContainer component={Paper}>
      <StyledTable
        sx={{ minWidth: 650, width: "100%" }}
        aria-label="simple table"
      >
        <StyledTableHead>
          <StyledTableRow>
            {tableHeaders.map((key) => (
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
                <StyledTableCell>{formatCurrency(row.valor)}</StyledTableCell>
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
  );
}
