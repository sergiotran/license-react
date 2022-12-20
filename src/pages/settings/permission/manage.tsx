import withAuth from "@/common/hocs/with-auth";
import MainLayout from "@/common/layouts/main-layout";
import PermissionManageUI from "@/features/permissions/permission-manage";
import React from "react";

const PermissionPage = () => {
  return (
    <MainLayout title="Roles & Permissions">
      <PermissionManageUI />
    </MainLayout>
  );
};

export default withAuth(PermissionPage);
