import React from 'react'
import MainLayout from '@/common/layouts/main-layout'
import LicenseDetailUI from '@/features/licenses/license-detail'
import { useAppSelector } from '@/app/store';
import { selectedLicenceDetail } from '@/features/licenses/license-slice';

const LicenseDetail = () => {
  const { name } = useAppSelector(selectedLicenceDetail)!;

  return (
    <MainLayout isFullHeight title={name}>
      <LicenseDetailUI />
    </MainLayout>
  )
}

export default LicenseDetail