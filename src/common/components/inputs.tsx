import React from 'react';
import TextField, { TextFieldProps } from "@mui/material/TextField";

const MainInput: React.FC<TextFieldProps> = React.forwardRef(function _MainInput(props, ref) {
  return <TextField ref={ref} {...props} variant='filled' />;
});

export { MainInput };
