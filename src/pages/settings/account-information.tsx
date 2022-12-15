import withAuth from '@/common/hocs/with-auth'
import MainLayout from '@/common/layouts/main-layout'
import AccountInformationUI from '@/features/accounts/information'

const AccountInformationPage = () => {
  return (
    <MainLayout title='Account Information'>
      <AccountInformationUI />
    </MainLayout>
  )
}

export default withAuth(AccountInformationPage)