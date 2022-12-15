import withAuth from '@/common/hocs/with-auth'
import MainLayout from '@/common/layouts/main-layout'
import React from 'react'

const PermissionModifyPage = () => {
  return (
    <MainLayout>
      <div>PermissionModifyPage</div>
    </MainLayout>
  )
}

export default withAuth(PermissionModifyPage)