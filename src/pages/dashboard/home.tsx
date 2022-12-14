import React from "react";
import MainLayout from '@/common/layouts/main-layout';
import withAuth from '@/common/hocs/with-auth';

const DashboardHomePage = () => {
  return (
    <MainLayout>
      <div>DashboardHomePage</div>
    </MainLayout>
  );
};

export default withAuth(DashboardHomePage);
