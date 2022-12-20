import React from "react";
import { SecondaryInput } from "@/common/components/inputs";
import { Box, CircularProgress, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Account } from "./account-model";
import { isEqual } from "lodash";
import { ResetButton, SaveButton } from "@/common/components/buttons";
import useAccount from '@/common/hooks/use-account';
import useSnackbar from '@/common/hooks/use-snackbar';

const AccountInformationUI = () => {
  const { showSuccess, showError } = useSnackbar();
  const { accountDetail: accountInformation, isLoading, updateAccount, updateAccountLocalData } = useAccount();

  const [isResetAvailable, setIsResetAvaiable] = React.useState<boolean>(false);

  const { control, watch, handleSubmit, reset, setValue } = useForm<
    {
      new_password: string;
      password_confirm: string;
    } & Account
  >();
  const watchAllField = watch();

  const handleSubmitForm = async (data: Partial<Account>) => {
    updateAccount(data).then((res) => {
      showSuccess("Update account successfully");
      updateAccountLocalData(res as Account);
    }).catch((err) => {
      showError(err.message);
    })
  };

  const handleResetDefault = () => reset();

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { new_password, password_confirm, ...compareObject } = watchAllField;
    setIsResetAvaiable(!isEqual(compareObject, accountInformation));
  }, [watchAllField]);

  React.useEffect(() => {
    if (accountInformation) {
      Object.entries(accountInformation).forEach(([key, value]) => {
        setValue(key as keyof Account, value);
      });
    }
  }, [accountInformation]);

  return (
    <Box width="100%" maxWidth="680px" marginLeft="auto" marginRight="auto">
      {(!isLoading && (
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
                <SecondaryInput label="Email" disabled {...field} />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <SecondaryInput isOptional label="Phone number" {...field} />
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
          <Stack
            gap={4}
            direction="row"
            justifyContent="center"
            marginTop="50px"
          >
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
      )) || (
        <Box sx={{ display: "flex", justifyContent: "center", padding: 10 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default AccountInformationUI;
