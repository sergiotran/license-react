import { useAppDispatch, useAppSelector } from "@/app/store";
import { Box, Stack, styled } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { selectApplicationList } from "../application/application-slice";
import { AppTitle } from "./components/app-title";
import { LogoBox } from "./components/logo-box";
import {
  LicenseByApp,
  selectLicenseDetail,
  selectLicenses,
} from "./license-slice";

const ViewDetailBtn = styled(Link)({
  fontWeight: 600,
  fontSize: "15px",
  lineHeight: "20px",
  color: "#26A69A",
  textDecoration: "none",
});

const LicenseManageUI = () => {
  const dispatch = useAppDispatch();
  const [licenseByApp, setLicenseByApp] = React.useState<LicenseByApp[]>([]);
  const licenseList = useAppSelector(selectLicenses);
  const applicationList = useAppSelector(selectApplicationList);

  const handleSelectAppDetail = (item: LicenseByApp) => {
    return () => dispatch(selectLicenseDetail(item));
  };

  React.useEffect(() => {
    if (licenseList.length > 0 && applicationList.length > 0) {
      setLicenseByApp(
        applicationList.map((app) => ({
          name: app.name,
          id: app.id,
          logo: `/icons/ic-logo-${app.code}.svg`,
          licenses: licenseList.filter(
            (license) => license.application_id === app.id
          ),
        }))
      );
    }
  }, []);

  return (
    <Box
      paddingTop={{
        xs: "0",
        lg: "36px",
      }}
      paddingLeft={{
        xs: "0",
        lg: "64px",
      }}
      paddingRight={{
        xs: "0",
        lg: "64px",
      }}
    >
      <Stack
        direction={{
          xs: "column",
          lg: "row",
        }}
        flexWrap="wrap"
        spacing={{
          xs: 2,
          lg: 0,
        }}
      >
        {licenseByApp.map((item) => (
          <Stack
            direction="row"
            flexBasis="50%"
            key={item.id}
            alignItems="flex-start"
          >
            <LogoBox>
              <img src={item.logo} alt={item.name} />
            </LogoBox>
            <Stack>
              <AppTitle>{item.name}</AppTitle>
              <ViewDetailBtn
                onClick={handleSelectAppDetail(item)}
                to={`/settings/licenses/${item.id}/detail`}
              >
                View Detail
              </ViewDetailBtn>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default LicenseManageUI;
