import { Box } from "@mui/material";
import React from "react";
interface ControlsContainerProps {
  children: React.ReactNode;
}
export const ControlsContainer = React.memo(function ({
  children,
}: ControlsContainerProps) {
  console.log("render ControlsContainer");
  return (
    <Box
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "row",
        margin: "5px",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
});
