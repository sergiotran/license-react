import withAuth from "@/common/hocs/with-auth";
import MainLayout from '@/common/layouts/main-layout';
import React from "react";

const PermissionPage = () => {
  return <MainLayout>
    <div>PermissionPage</div>
  </MainLayout>;
};

export default withAuth(PermissionPage);
