import withAuth from "@/common/hocs/with-auth";
import MainLayout from "@/common/layouts/main-layout";
import UserDetailUI from '@/features/users/user-detail';
import React from "react";

const UserDetailPage = () => {
  return (
    <MainLayout title='Edit user'>
      <UserDetailUI />
    </MainLayout>
  );
};

export default withAuth(UserDetailPage);
