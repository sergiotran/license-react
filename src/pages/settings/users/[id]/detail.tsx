import withAuth from "@/common/hocs/with-auth";
import MainLayout from "@/common/layouts/main-layout";
import React from "react";

const UserDetailUI = () => {
  return (
    <MainLayout>
      <div>UserDetailUI</div>
    </MainLayout>
  );
};

export default withAuth(UserDetailUI);
