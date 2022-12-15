import withAuth from '@/common/hocs/with-auth'
import MainLayout from '@/common/layouts/main-layout'
import React from 'react'

const UserCreateUI = () => {
  return (
    <MainLayout>
      <div>UserCreateUI</div>
    </MainLayout>
  )
}

export default withAuth(UserCreateUI)