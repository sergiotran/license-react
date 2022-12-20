import { ResetButton, SaveButton } from "@/common/components/buttons";
import { FormLabel, SecondaryInput } from "@/common/components/inputs";
import { Box, CircularProgress, Stack } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Account } from "../accounts/account-model";
import Select from "@/common/components/select";
import useAccount from "@/common/hooks/use-account";
import useSnackbar from "@/common/hooks/use-snackbar";

type Props = {
  isCreateAction?: boolean;
};

const UserDetailUI: React.FC<Props> = ({ isCreateAction = false }) => {
  const { showSuccess, showError } = useSnackbar();
  const {
    updateAccount,
    updateAccountLocalData,
    isLoading,
    accountDetail,
    fetchAccount,
  } = useAccount();
  const params = useParams();

  const accountInformation = isCreateAction ? {} : accountDetail;
  const { control, handleSubmit, setValue } = useForm<
    {
      new_password: string;
      password_confirm: string;
    } & Account
  >();

  const handleSubmitForm = async (data: Partial<Account>) => {
    updateAccount(data)
      .then((res) => {
        showSuccess("Update account successfully");
        updateAccountLocalData(res as Account);
      })
      .catch((err) => showError(err.message));
  };

  React.useEffect(() => {
    if (params.id && !isCreateAction) {
      fetchAccount(params.id);
    }
  }, [params.id, isCreateAction]);

  React.useEffect(() => {
    if (accountInformation) {
      Object.entries(accountInformation).forEach(([key, value]) => {
        setValue(key as keyof Account, value as any);
      });
    }
  }, [accountInformation]);

  return (
    <Box width="100%" maxWidth="680px" marginLeft="auto" marginRight="auto">
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", padding: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
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
                <SecondaryInput
                  label="Username"
                  disabled={!isCreateAction}
                  required
                  {...field}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <SecondaryInput
                  label="Email"
                  disabled={!isCreateAction}
                  {...field}
                  required
                />
              )}
            />
            <Controller
              name="new_password"
              control={control}
              render={({ field }) => (
                <SecondaryInput label="New password" required {...field} />
              )}
            />
            <Controller
              name="password_confirm"
              control={control}
              render={({ field }) => (
                <SecondaryInput label="Confirm Password" {...field} />
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
              name="role"
              control={control}
              render={({ field }) => (
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                  spacing={{
                    xs: 2,
                    md: 0,
                  }}
                >
                  <FormLabel isOptional={false} isRequired={false}>
                    Role
                  </FormLabel>
                  <Select
                    sx={{
                      backgroundColor: "#ecf0f3",
                      flex: 1,
                    }}
                    label="Role"
                    {...field}
                  />
                </Stack>
              )}
            />
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                  spacing={{
                    xs: 2,
                    md: 0,
                  }}
                >
                  <FormLabel isOptional={false} isRequired={false}>
                    Status
                  </FormLabel>
                  <Select
                    sx={{
                      backgroundColor: "#ecf0f3",
                      flex: 1,
                    }}
                    label="Role"
                    {...field}
                  />
                </Stack>
              )}
            />
          </Stack>
          <Stack
            gap={4}
            direction="row"
            justifyContent="center"
            marginTop="50px"
          >
            <ResetButton type="button">Cancel</ResetButton>
            <SaveButton type="submit">Save</SaveButton>
          </Stack>
        </form>
      )}
    </Box>
  );
};

export default UserDetailUI;
