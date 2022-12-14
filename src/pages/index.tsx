import "@/common/styles/global.scss"
import MainLayout from '@/common/layouts/main-layout';
import { useNavigate } from 'react-router-dom';
import React from 'react';


function HomePage() {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/dashboard/home');
  }, [])

  return (
    <MainLayout>
      Loading...
    </MainLayout>
  )
}

export default HomePage
