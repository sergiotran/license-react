import { useAppDispatch } from '@/app/store'
import withAuth from '@/common/hocs/with-auth'
import MainLayout from '@/common/layouts/main-layout'
import LicenseManageUI from '@/features/licenses/license-manage'
import { fetchLicenses } from '@/features/licenses/license-slice'
import React from 'react'

const LicensesPage = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchLicenses());
  }, [])

  return (
    <MainLayout title='License'>
      <LicenseManageUI />
    </MainLayout>
  )
}

export default withAuth(LicensesPage); 