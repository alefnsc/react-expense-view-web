import { Box } from "@mui/material";

interface SelectsContainerProps {
  children: React.ReactNode;
}

export function SelectsContainer({ children }: SelectsContainerProps) {
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
}
