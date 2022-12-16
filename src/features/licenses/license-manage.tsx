import { useAppDispatch, useAppSelector } from "@/app/store";
import { Box, Stack, capitalize, styled } from "@mui/material";
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
const ContentHeading = styled('h3')({
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '38px',
  color: '#646C7B',
  marginBottom: '36px',
})

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
        Object.values(
          licenseList.reduce((acc: { [key: string]: LicenseByApp }, v) => {
            acc[v.application_id] = {
              name: capitalize(v.application_code),
              id: v.application_id,
              logo: `/icons/ic-logo-${v.application_code}.svg`,
              plan: v.plan_code,
              licenses: acc[v.application_id]?.licenses || [],
            };
            acc[v.application_id].licenses.push(v);
            return acc;
          }, {})
        )
      );
    }
  }, []);

  return (
    <Box>
      <ContentHeading>ConnectPOS Products</ContentHeading>
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        flexWrap="wrap"
        spacing={{
          xs: 2,
          md: 0,
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
              {!!item.plan && <span>Plan: {item.plan}</span>}
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
