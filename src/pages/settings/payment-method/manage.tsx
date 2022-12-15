import withAuth from "@/common/hocs/with-auth";
import MainLayout from "@/common/layouts/main-layout";
import PaymentManageUI from '@/features/payment/payment-manage';
import React from "react";

const PaymentMethodManagePage = () => {
  return (
    <MainLayout>
      <PaymentManageUI />
    </MainLayout>
  );
};

export default withAuth(PaymentMethodManagePage);
