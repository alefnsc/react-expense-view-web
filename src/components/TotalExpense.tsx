import { Box } from "@mui/material";
import React from "react";

interface TotalExpenseProps {
  totalExpenses: string;
}

export const TotalExpense = React.memo(function ({
  totalExpenses,
}: TotalExpenseProps) {
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
});
