import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { SecondaryInput } from "@/common/components/inputs";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, styled } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Account } from "./account-model";
import {
  selectAccountData,
  selectAccountLoading,
  setAccountData,
  updateAccountInfo,
} from "./account-slice";
import { isEqual } from "lodash";
import { handleShowSnackbar } from '../snackbar/snackbar-slice';

const FormLabel = styled("label", {
  shouldForwardProp: (props) => props !== "isRequired",
})<{ isRequired: boolean }>(({ theme, isRequired = false }) => ({
  textAlign: "left",
  fontWeight: 600,
  width: 190,
  color: "#818181",
  "&::after": (isRequired ? {
    content: '"*"',
    color: theme.palette.error.main,
    marginLeft: 5
  } : {
    content: '"(Optional)"',
    color: '#f4a522',
    display: 'block',
    fontSize: 12,
    fontWeight: 100,
  })
}));

const FormButton = styled(LoadingButton)({
  padding: "12px 15px",
  textTransform: "uppercase",
  minWidth: 140,
  fontSize: 13,
  fontWeight: 600,
});

const ResetButton = styled(FormButton)(() => ({
  backgroundColor: "#ebebeb",
  color: "#333",
  "&:hover": {
    backgroundColor: "#ebebeb",
    color: "#333",
  },
}));

const SaveButton = styled(FormButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
}));

const AccountInformationUI = () => {
  const dispatch = useAppDispatch();
  const accountInformation = useAppSelector(selectAccountData);
  const isLoading = useAppSelector(selectAccountLoading);

  const [isResetAvailable, setIsResetAvaiable] = React.useState<boolean>(false);

  const { control, watch, handleSubmit, reset } = useForm<
    {
      new_password: string;
      password_confirm: string;
    } & Account
  >({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    defaultValues: { ...accountInformation }!,
  });
  const watchAllField = watch();

  const handleSubmitForm = async (data: Partial<Account>) => {
    dispatch(updateAccountInfo(data)).unwrap().then((value) => {
      dispatch(handleShowSnackbar({
        type: 'success',
        message: 'Update account successfully',
      }));
      dispatch(setAccountData(value));
    }).catch((err) => {
      dispatch(handleShowSnackbar({
        type: 'error',
        message: err.message,
      }))
    });
  };

  const handleResetDefault = () => reset();

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { new_password, password_confirm, ...compareObject } = watchAllField;
    setIsResetAvaiable(!isEqual(compareObject, accountInformation));
  }, [watchAllField]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "680px",
        margin: "62px auto",
      }}
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Stack spacing="20px">
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <Stack direction="row" justifyContent="space-between">
                <FormLabel isRequired htmlFor={field.name}>
                  First name
                </FormLabel>
                <SecondaryInput {...field} required />
              </Stack>
            )}
          />
          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <Stack direction="row" justifyContent="space-between">
                <FormLabel isRequired htmlFor={field.name}>
                  Last name
                </FormLabel>
                <SecondaryInput {...field} required />
              </Stack>
            )}
          />
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Stack direction="row" justifyContent="space-between">
                <FormLabel isRequired htmlFor={field.name}>
                  Username
                </FormLabel>
                <SecondaryInput disabled {...field} />
              </Stack>
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Stack direction="row" justifyContent="space-between">
                <FormLabel isRequired htmlFor={field.name}>
                  Email
                </FormLabel>
                <SecondaryInput disabled {...field} required />
              </Stack>
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Stack direction="row" justifyContent="space-between">
                <FormLabel isRequired={false} htmlFor={field.name}>
                  Phone number
                </FormLabel>
                <SecondaryInput {...field} />
              </Stack>
            )}
          />
          <Controller
            name="new_password"
            control={control}
            render={({ field }) => (
              <Stack direction="row" justifyContent="space-between">
                <FormLabel isRequired htmlFor={field.name}>
                  New Password
                </FormLabel>
                <SecondaryInput {...field} />
              </Stack>
            )}
          />
          <Controller
            name="password_confirm"
            control={control}
            render={({ field }) => (
              <Stack direction="row" justifyContent="space-between">
                <FormLabel isRequired htmlFor={field.name}>
                  Confirm Password
                </FormLabel>
                <SecondaryInput {...field} />
              </Stack>
            )}
          />
        </Stack>
        <Stack gap={4} direction="row" justifyContent="center" marginTop="50px">
          <ResetButton
            disabled={!isResetAvailable || isLoading}
            onClick={handleResetDefault}
            type="button"
          >
            Reset
          </ResetButton>
          <SaveButton type="submit" loading={isLoading}>
            Save
          </SaveButton>
        </Stack>
      </form>
    </Box>
  );
};

export default AccountInformationUI;
