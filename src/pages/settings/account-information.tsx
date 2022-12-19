import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import withAuth from "@/common/hocs/with-auth";
import MainLayout from "@/common/layouts/main-layout";
import AccountInformationUI from "@/features/accounts/information";
import {
  fetchAccountById,
  selectAccountId,
} from "@/features/accounts/account-slice";

const AccountInformationPage = () => {
  const dispatch = useAppDispatch();
  const accountId = useAppSelector(selectAccountId);

  React.useEffect(() => {
    if (accountId) dispatch(fetchAccountById(accountId));
  }, [accountId]);

  return (
    <MainLayout title="Account Information">
      <AccountInformationUI />
    </MainLayout>
  );
};

export default withAuth(AccountInformationPage);
