import React from "react";
import withAuth from "@/common/hocs/with-auth";
import MainLayout from "@/common/layouts/main-layout";
import AccountInformationUI from "@/features/accounts/information";
import useAccount from "@/common/hooks/use-account";

const AccountInformationPage = () => {
  const { accountId, fetchAccount, accountDetail } = useAccount();

  React.useEffect(() => {
    if (
      (!!accountDetail && !!accountId && accountId !== accountDetail.id) ||
      (!accountDetail && accountId)
    ) {
      fetchAccount(accountId);
    }
  }, [accountDetail, accountId]);

  return (
    <MainLayout title="Account Information">
      <AccountInformationUI />
    </MainLayout>
  );
};

export default withAuth(AccountInformationPage);
