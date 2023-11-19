import TableHead from "@mui/material/TableHead";
import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const StyledTable = styled(Table)`
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

export const StyledTableCell = styled(TableCell)`
  flex-direction: column;
  text-align: left;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
`;

export const StyledTableRow = styled(TableRow)`
  text-align: center;
`;

export const StyledTableHead = styled(TableHead)`
  font-weight: 1000;
  text-align: center;
`;
