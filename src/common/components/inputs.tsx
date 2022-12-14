import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Input, { InputProps } from "@mui/material/Input";

const MainInput: React.FC<TextFieldProps> = React.forwardRef(
  function _MainInput(props, ref) {
    return <TextField ref={ref} {...props} variant="filled" />;
  }
);

const SecondaryInput: React.FC<InputProps> = React.forwardRef(
  function _SecondaryInput(props, ref) {
    return (
      <Input
        ref={ref}
        {...props}
        sx={{
          backgroundColor: "#ecf0f3",
          height: 40,
          "&::before, &::after": {
            display: "none",
          },
          flex: 1,
          borderRadius: '4px'
        }}
        inputProps={{
          style: {
            border: "none",
            fontSize: "14px",
            lineHeight: 1.42857143,
            color: "#555",
            padding: '6px 12px'
          },
        }}
      />
    );
  }
);

export { MainInput, SecondaryInput };
