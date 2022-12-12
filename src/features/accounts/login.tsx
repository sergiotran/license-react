import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { MainInput } from "@/common/components/inputs";
import PasswordIcon from "@mui/icons-material/Password";
import KeyboardAltIcon from "@mui/icons-material/KeyboardAlt";
import CropFreeIcon from "@mui/icons-material/CropFree";
import { capitalize, IconButton, InputAdornment, styled } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LOGIN_TYPES = [
  {
    value: "PASSWORD",
    label: "PASSWORD",
    icon: <PasswordIcon />,
  },
  {
    value: "PINCODE",
    label: "PIN CODE",
    icon: <KeyboardAltIcon />,
  },
  {
    value: "BARCODE",
    label: "BAR CODE",
    icon: <CropFreeIcon />,
  },
] as const;
type LOGIN_TYPE_VALUE = typeof LOGIN_TYPES[number]["value"];

export type FormPayload = {
  username?: string;
  password?: string;
  pin_code?: string;
  bar_code?: string;
};

const LoginTypeButton = styled(Button, {
  shouldForwardProp: (props) => props !== "isActive",
})<{
  isActive: boolean;
}>(({ theme, isActive = false }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  borderRadius: "5px",
  padding: 15,
  fontWeight: 900,
  backgroundColor: isActive
    ? theme.palette.secondary.main
    : theme.palette.common.white,
  color: isActive ? theme.palette.common.white : theme.palette.common.black,
  "&:hover": {
    backgroundColor: isActive
      ? theme.palette.secondary.main
      : theme.palette.common.white,
  },
}));

const LoginForm = styled("form")({
  width: 315,
  maxWidth: "100%",
});

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  marginTop: 30,
  minWidth: 114,
  maxWidth: "100%",
  fontSize: 18,
  textAlign: "center",
}));



const LoginUI = () => {
  // States
  const [loginType, setLoginTypes] = React.useState<LOGIN_TYPE_VALUE>("PASSWORD");
  const [isShowPassword, setIsShowPassword] = React.useState<boolean>(false);

  const formDefaultValue = React.useMemo(() => {
    switch (loginType) {
      case "PASSWORD":
        return {
          username: "",
          password: "",
        };
      case "PINCODE":
        return {
          pin_code: "",
        };
      case "BARCODE":
        return {
          bar_code: "",
        };
    }
  }, [loginType]);

  // Hooks
  const { control, handleSubmit, reset } = useForm<FormPayload>({
    defaultValues: formDefaultValue,
  });

  // Handlers
  const handleClickShowPassword = () => setIsShowPassword(true);
  const handleMouseDownPassword = () => setIsShowPassword(false);
  const handleChangeType = (type: LOGIN_TYPE_VALUE) => {
    return () => setLoginTypes(type);
  };

  const handleSubmitForm = React.useCallback(
    (payload: FormPayload) => {
      console.log(payload);
    },
    [loginType]
  );

  React.useEffect(() => {
    reset();
    setIsShowPassword(false);
  }, [loginType]);

  return (
    <>
      <Stack
        style={{ backgroundColor: "#F0F0F0" }}
        padding="25px 0"
        direction="row"
        spacing={2}
        width="100%"
        justifyContent="center"
        marginBottom="30px"
      >
        {LOGIN_TYPES.map(({ value, label, icon }) => (
          <LoginTypeButton
            key={value}
            type="button"
            onClick={handleChangeType(value)}
            isActive={loginType === value}
          >
            {icon}
            <span style={{ paddingTop: "9px" }}>{label}</span>
          </LoginTypeButton>
        ))}
      </Stack>
      <LoginForm onSubmit={handleSubmit(handleSubmitForm)}>
        <Stack spacing={2}>
          <Controller
            name={(() => {
              if (loginType === "PASSWORD") return "username";
              if (loginType === "PINCODE") return "pin_code";
              return "bar_code";
            })()}
            control={control}
            render={({ field }) => (
              <MainInput
                required
                label={(() => {
                  const label = LOGIN_TYPES.find(
                    (type) => type.value === loginType
                  )?.label;
                  return label === "PASSWORD"
                    ? "Username"
                    : capitalize(label?.toLowerCase() ?? "");
                })()}
                {...field}
              />
            )}
          />
          {loginType === "PASSWORD" && (
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <MainInput
                  required
                  label="Password"
                  type={isShowPassword ? "text" : "password"}
                  InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {isShowPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...field}
                />
              )}
            />
          )}
        </Stack>
        <SubmitButton variant="contained" type="submit">
          Login
        </SubmitButton>
      </LoginForm>
    </>
  );
};

export default LoginUI;
