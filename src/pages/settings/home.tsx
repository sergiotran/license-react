import React from "react";
import MainLayout from "@/common/layouts/main-layout";
import withAuth from "@/common/hocs/with-auth";
import { Box, CircularProgress, Stack } from "@mui/material";
import { NAVIGATION_ITEMS } from "@/features/navigation/collapsible-navigation";
import useAccount from "@/common/hooks/use-account";

const DashboardHomePage = () => {
  const { isLoading, accountId, accountDetail, fetchAccount } = useAccount();

  React.useEffect(() => {
    if (
      (!!accountDetail && !!accountId && accountId !== accountDetail.id) ||
      (!accountDetail && accountId)
    ) {
      fetchAccount(accountId);
    }
  }, [accountDetail, accountId]);

  return (
    <MainLayout>
      <Stack>
        {isLoading ? (
          <Box>
            <CircularProgress />
          </Box>
        ) : (
          Object.entries(NAVIGATION_ITEMS).map(([title, items]) => {
            return <Box key={title}>{title}</Box>;
          })
        )}
      </Stack>
    </MainLayout>
  );
};

export default withAuth(DashboardHomePage);
