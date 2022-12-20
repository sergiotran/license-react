import { ResetButton, SaveButton } from "@/common/components/buttons";
import { SecondaryInput } from "@/common/components/inputs";
import { Box, CircularProgress, Stack } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Account } from "../accounts/account-model";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  fetchAccountById,
  selectAccountData,
  selectAccountLoading,
  setAccountData,
  updateAccountInfo,
} from "../accounts/account-slice";
import { handleShowSnackbar } from '../snackbar/snackbar-slice';

type Props = {
  isCreateAction?: boolean;
};

const UserDetailUI: React.FC<Props> = ({ isCreateAction = false }) => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAccountLoading);

  const accountInformation = isCreateAction
    ? {}
    : useAppSelector(selectAccountData);
  const { control, handleSubmit, setValue } = useForm<
    {
      new_password: string;
      password_confirm: string;
    } & Account
  >();

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

  React.useEffect(() => {
    if (params.id && !isCreateAction) {
      dispatch(fetchAccountById(params.id));
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
                <SecondaryInput label="Username" disabled={!isCreateAction} required {...field} />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <SecondaryInput label="Email" disabled={!isCreateAction} {...field} required />
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
