import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface ControlSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (event: SelectChangeEvent) => void;
}

export function ControlSelect({
  label,
  value,
  onChange,
  options,
}: ControlSelectProps) {
  const handleSelectChange = (event: SelectChangeEvent) => {
    onChange(event);
  };
  return (
    <FormControl
      fullWidth
      style={{
        margin: "5px",
      }}
    >
      <InputLabel id={`select-${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`select-${label}-label`}
        id={`select-${label}`}
        value={value}
        label={label}
        onChange={handleSelectChange}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
