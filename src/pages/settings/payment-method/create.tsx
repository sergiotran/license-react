import withAuth from '@/common/hocs/with-auth'
import MainLayout from '@/common/layouts/main-layout'
import React from 'react'

const PaymentMethodCreatePage = () => {
  return (
    <MainLayout>
      <div>PaymentMethodCreatePage</div>
    </MainLayout>
  )
}

export default withAuth(PaymentMethodCreatePage)