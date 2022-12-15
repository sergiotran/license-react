import { useAppSelector } from "@/app/store";
import {
  Box,
  Button,
  Input,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { AppTitle } from "./components/app-title";
import { ChangePlanButton } from "./components/change-plan-btn";
import { LogoBox } from "./components/logo-box";
import { selectedLicenceDetail } from "./license-slice";

const ViewAppStoreBtn = styled(Button)({
  borderRadius: "50px",
  fontSize: "15px",
  lineHeight: "20px",
  fontWeight: 400,
  textTransform: "none",
});

const ContentHeading = styled(Typography)({
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "22px",
  color: "#555555",
});

const StatusText = styled("span", {
  shouldForwardProp: (props) => props !== "isActive",
})<{ isActive: boolean }>(({ theme, isActive = false }) => ({
  fontWeight: 400,
  fontSize: "15px",
  lineHeight: "20px",
  color: isActive ? theme.palette.primary.main : "#757474",
}));

const ViewDetailBtn = styled(Button)({
  color: "#2887CC",
  fontWeight: 400,
  fontSize: "15px",
  lineHeight: "20px",
});

const THead = styled(TableHead)({
  backgroundColor: "#8797A1",
});
const THeadCell = styled(TableCell)({
  color: "#fff",
  fontWeight: 700,
  fontSize: "15px",
  lineHeight: "20px",
});
const TInput = styled(Input)({
  width: "100%",
  "& input": {
    border: "1px solid #E9E9E9",
    padding: "8px 15px",
    borderRadius: "4px",
    color: "#555555",
  },
});

const LicenseDetailUI = () => {
  const { licenses, logo, name } = useAppSelector(selectedLicenceDetail)!;

  return (
    <Box
      sx={{
        padding: "61px 34px",
      }}
    >
      <Stack spacing="43px">
        <Stack direction="row">
          <LogoBox>
            <img src={logo} alt={name} />
          </LogoBox>
          <Stack direction="column" spacing="14px">
            <AppTitle>{name}</AppTitle>
            <ViewAppStoreBtn variant="outlined">
              View on app store
            </ViewAppStoreBtn>
          </Stack>
        </Stack>
        <Stack spacing="19px">
          <ContentHeading>Your licenses:</ContentHeading>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <THead
                sx={{
                  backgroundColor: "#8797A1",
                  color: "#fff",
                }}
              >
                <TableRow>
                  <THeadCell>License status</THeadCell>
                  <THeadCell>Base url</THeadCell>
                  <THeadCell>Plan</THeadCell>
                  <THeadCell>View detail</THeadCell>
                  <THeadCell>Change plan</THeadCell>
                </TableRow>
              </THead>
              <TableBody>
                {licenses.map((license) => (
                  <TableRow
                    key={license.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Stack direction="row" spacing="14px">
                        {(() => {
                          if (license.is_active) {
                            return (
                              <>
                                <img
                                  width={24}
                                  height={21}
                                  src="/icons/ic-certificate-active.svg"
                                  alt="License active"
                                />
                                <StatusText isActive={true}>Active</StatusText>
                              </>
                            );
                          }
                          return (
                            <>
                              <img
                                width={24}
                                height={21}
                                src="/icons/ic-certificate-deactive.svg"
                                alt="License deactive"
                              />
                              <StatusText isActive={false}>Deactive</StatusText>
                            </>
                          );
                        })()}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <TInput value={license.auth_url} disabled />
                    </TableCell>
                    <TableCell>Premium</TableCell>
                    <TableCell>
                      <ViewDetailBtn variant="text">View detail</ViewDetailBtn>
                    </TableCell>
                    <TableCell>
                      <ChangePlanButton>Change plan</ChangePlanButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LicenseDetailUI;
