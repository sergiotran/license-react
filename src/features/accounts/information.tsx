import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { SecondaryInput } from "@/common/components/inputs";
import { Box, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Account } from "./account-model";
import {
  selectAccountData,
  selectAccountLoading,
  setAccountData,
  updateAccountInfo,
} from "./account-slice";
import { isEqual } from "lodash";
import { handleShowSnackbar } from "../snackbar/snackbar-slice";
import { ResetButton, SaveButton } from "@/common/components/buttons";

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
    dispatch(updateAccountInfo(data))
      .unwrap()
      .then((value) => {
        dispatch(
          handleShowSnackbar({
            type: "success",
            message: "Update account successfully",
          })
        );
        dispatch(setAccountData(value));
      })
      .catch((err) => {
        dispatch(
          handleShowSnackbar({
            type: "error",
            message: err.message,
          })
        );
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
      width="100%"
      maxWidth="680px"
      marginTop={{
        xs: "15px",
        md: "62px",
      }}
      marginLeft="auto"
      marginRight="auto"
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Stack spacing="20px">
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <SecondaryInput label="First name" {...field} required />
            )}
          />
          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <SecondaryInput label="Last name" {...field} required />
            )}
          />
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <SecondaryInput label="Username" disabled {...field} />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <SecondaryInput label="Email" disabled {...field} required />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <SecondaryInput label="Phone number" {...field} />
            )}
          />
          <Controller
            name="new_password"
            control={control}
            render={({ field }) => (
              <SecondaryInput label="New password" {...field} />
            )}
          />
          <Controller
            name="password_confirm"
            control={control}
            render={({ field }) => (
              <SecondaryInput label="Confirm Password" {...field} />
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
