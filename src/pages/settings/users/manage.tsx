import withAuth from "@/common/hocs/with-auth";
import MainLayout from "@/common/layouts/main-layout";
import UserManageUI from '@/features/users/user-manage';

const UserPage = () => {
  return (
    <MainLayout isFullHeight title='User management'>
      <UserManageUI />
    </MainLayout>
  );
};

export default withAuth(UserPage);
