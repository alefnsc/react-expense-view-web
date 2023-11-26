import { Box } from "@mui/material";
import React from "react";
interface SelectsContainerProps {
  children: React.ReactNode;
}

export const SelectsContainer = React.memo(function ({
  children,
}: SelectsContainerProps) {
  return (
    <Box
      style={{
        width: "40%",
        display: "flex",
      }}
    >
      {children}
    </Box>
  );
});
