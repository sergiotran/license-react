import withAuth from '@/common/hocs/with-auth'
import MainLayout from '@/common/layouts/main-layout'
import React from 'react'

const PaymentMethodDetail = () => {
  return (
    <MainLayout>
      <div>PaymentMethodDetail</div>
    </MainLayout>
  )
}

export default withAuth(PaymentMethodDetail);