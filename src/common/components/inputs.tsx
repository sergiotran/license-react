import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Input, { InputProps } from "@mui/material/Input";
import {
  Stack,
  styled,
} from "@mui/material";

const FormLabel = styled("label", {
  shouldForwardProp: (props) => props !== "isRequired",
})<{ isRequired: boolean }>(({ theme, isRequired = false }) => ({
  textAlign: "left",
  fontWeight: 600,
  width: 190,
  color: "#818181",
  "&::after": isRequired
    ? {
        content: '"*"',
        color: theme.palette.error.main,
        marginLeft: 5,
      }
    : {
        content: '"(Optional)"',
        color: "#f4a522",
        display: "block",
        fontSize: 12,
        fontWeight: 100,
      },
}));

export const MainInput: React.FC<TextFieldProps> = React.forwardRef(
  function _MainInput(props, ref) {
    return <TextField ref={ref} {...props} variant="filled" />;
  }
);

export const SecondaryInput: React.FC<{ label?: string } & InputProps> =
  React.forwardRef(function _SecondaryInput(props, ref) {
    return (
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        spacing={{
          xs: 2,
          md: 0,
        }}
      >
        {!!props!.label && (
          <FormLabel isRequired htmlFor={props!.name}>
            {props!.label}
          </FormLabel>
        )}
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
            borderRadius: "4px",
            ...(props!.sx ?? {}),
          }}
          inputProps={{
            style: {
              border: "none",
              fontSize: "14px",
              lineHeight: 1.42857143,
              color: "#555",
              padding: "6px 12px",
            },
          }}
        />
      </Stack>
    );
  });
