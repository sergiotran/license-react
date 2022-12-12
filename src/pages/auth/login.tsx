import AuthLayout from '@/common/layouts/auth-layout'
import LoginUI from '@/features/accounts/login'

const LoginPage = () => {
  return (
    <AuthLayout title='Login'>
      <LoginUI />
    </AuthLayout>
  )
}

export default LoginPage