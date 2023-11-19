import { Box } from "@mui/material";

interface ControlsContainerProps {
  children: React.ReactNode;
}

export function ControlsContainer({ children }: ControlsContainerProps) {
  return (
    <Box
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "row",
        margin: "5px",
        justifyContent: "space-between",
      }}
    >
      {children}
    </Box>
  );
}
