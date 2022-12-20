import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import withAuth from "@/common/hocs/with-auth";
import MainLayout from "@/common/layouts/main-layout";
import AccountInformationUI from "@/features/accounts/information";
import {
  fetchAccountById,
  selectAccountId,
} from "@/features/accounts/account-slice";
import useAccount from "@/common/hooks/use-account";

const AccountInformationPage = () => {
  const { accountId, fetchAccount, accountDetail } = useAccount();

  React.useEffect(() => {
    if (accountId && accountDetail && accountId !== accountDetail.id)
      fetchAccount(accountId);
  }, [accountId, accountDetail]);

  return (
    <MainLayout title="Account Information">
      <AccountInformationUI />
    </MainLayout>
  );
};

export default withAuth(AccountInformationPage);
