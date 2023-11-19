import { Box } from "@mui/material";

interface TotalExpenseProps {
  totalExpenses: string;
}

export default function TotalExpense({ totalExpenses }: TotalExpenseProps) {
  return (
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
  );
}
