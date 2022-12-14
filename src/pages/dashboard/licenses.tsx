import withAuth from '@/common/hocs/with-auth'
import MainLayout from '@/common/layouts/main-layout'
import LicenseManageUI from '@/features/licenses/license-manage'
import React from 'react'

const LicensesPage = () => {
  return (
    <MainLayout title='License'>
      <LicenseManageUI />
    </MainLayout>
  )
}

export default withAuth(LicensesPage); 