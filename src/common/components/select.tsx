import { Select as MuiSelect, SelectProps } from "@mui/material";
import React from "react";

const Select: React.FC<SelectProps> = React.forwardRef(function _(props, ref) {
  return (
    <MuiSelect
      ref={ref}
      {...props}
      sx={{
        minWidth: 150,
        backgroundColor: "#fff",
        height: "40px",
        fontSize: "14px",
        "& .MuiOutlinedInput-notchedOutline": {
          display: "none",
        },
        "& .MuiSelect-select": {
          minHeight: "auto",
          padding: "6px 12px",
        },
      }}
    >
      {props!.children}
    </MuiSelect>
  );
});

export default Select;
