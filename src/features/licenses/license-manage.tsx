import { useAppDispatch, useAppSelector } from "@/app/store";
import { Box } from "@mui/material";
import React from "react";
import { fetchLicenses, selectLicenses } from "./license-slice";

const LicenseManageUI = () => {
  const dispatch = useAppDispatch();
  const licenseList = useAppSelector(selectLicenses) ?? [];

  console.log('hehe');

  React.useEffect(() => {
    console.log('hihi');
    if (!licenseList.length) dispatch(fetchLicenses());
  }, []);

  return (
    <Box
      sx={{
        padding: "36px 64px",
      }}
    ></Box>
  );
};

export default LicenseManageUI;
