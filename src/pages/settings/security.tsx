import withAuth from '@/common/hocs/with-auth'
import MainLayout from '@/common/layouts/main-layout'
import SecurityUI from '@/features/security/security'
import React from 'react'

const SecurityPage = () => {
  return (
    <MainLayout title='Security'>
      <SecurityUI />
    </MainLayout>
  )
}

export default withAuth(SecurityPage) 