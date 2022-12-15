import withAuth from "@/common/hocs/with-auth";
import MainLayout from "@/common/layouts/main-layout";
import React from "react";

const UserPage = () => {
  return (
    <MainLayout>
      <div>UserPage</div>
    </MainLayout>
  );
};

export default withAuth(UserPage);
