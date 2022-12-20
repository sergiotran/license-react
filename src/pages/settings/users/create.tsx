import withAuth from "@/common/hocs/with-auth";
import MainLayout from "@/common/layouts/main-layout";
import UserDetailUI from "@/features/users/user-detail";
import React from "react";

const UserCreateUI = () => {
  return (
    <MainLayout title="Create user">
      <UserDetailUI isCreateAction />
    </MainLayout>
  );
};

export default withAuth(UserCreateUI);
