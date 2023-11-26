import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
  StyledTableHead,
} from "../styles/tableStyles.ts";
import { Expense, ExpenseCategory } from "../types/expenseType.ts";
import { formatCurrency } from "../helpers/tableHelpers.ts";

interface ExpenseTableProps {
  rows: Expense[] | ExpenseCategory[];
  tab: string;
}

export function ExpenseTable({ rows, tab }: ExpenseTableProps) {
  let tableHeaders: string[] = [];

  if (tab === "Summary") {
    tableHeaders = ["CATEGORY", "VALUE"];
  }
  if (tab === "Detail") {
    tableHeaders = ["DESCRIPTION", "CATEGORY", "VALUE", "MONTH", "DAY"];
  }
  function isExpense(row: Expense | ExpenseCategory): row is Expense {
    return (row as Expense).descricao !== undefined;
  }
  return (
    <TableContainer component={Paper}>
      <StyledTable
        sx={{ minWidth: 500, width: "100%" }}
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
                {tab === "Detail" && isExpense(row) && (
                  <StyledTableCell>{row.descricao}</StyledTableCell>
                )}
                <StyledTableCell>{row.categoria}</StyledTableCell>
                <StyledTableCell>{formatCurrency(row.valor)}</StyledTableCell>
                {tab === "Detail" && isExpense(row) && (
                  <>
                    <StyledTableCell>{row.mes.split("-")[1]}</StyledTableCell>
                    <StyledTableCell>{row.dia}</StyledTableCell>
                  </>
                )}
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
