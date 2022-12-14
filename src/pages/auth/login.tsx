import withAuth from '@/common/hocs/with-auth'
import AuthLayout from '@/common/layouts/auth-layout'
import LoginUI from '@/features/auth/login'

const LoginPage = () => {
  return (
    <AuthLayout title='Login'>
      <LoginUI />
    </AuthLayout>
  )
}

export default withAuth(LoginPage);