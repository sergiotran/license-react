import { useAppSelector } from "@/app/store";
import {
  Box,
  Button,
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
import LicenseDetailModal from './components/license-detail-modal';
import { License } from './license-model';
import { StatusText } from './components/status-text';
import { TableInput } from './components/table-input';

const ViewAppStoreBtn = styled(Button)({
  borderRadius: "50px",
  fontSize: "15px",
  lineHeight: "20px",
  fontWeight: 400,
  textTransform: "none",
  padding: '9px 14px'
});

const ContentHeading = styled(Typography)({
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "22px",
  color: "#555555",
});

const ViewDetailBtn = styled(Button)({
  color: "#2887CC",
  fontWeight: 400,
  fontSize: "15px",
  lineHeight: "20px",
});

export const THead = styled(TableHead)({
  backgroundColor: "#8797A1",
});
export const THeadCell = styled(TableCell)({
  color: "#fff",
  fontWeight: 700,
  fontSize: "15px",
  lineHeight: "20px",
  backgroundColor: "#8797A1",
});

const LicenseDetailUI = () => {
  const { licenses, logo, name } = useAppSelector(selectedLicenceDetail)!;
  const [detailData, setDetailData] = React.useState<License | null>(null);

  const handleViewDetail = (data: License | null) => () => {
    setDetailData(data);
  }

  const handleCloseViewDetail = () => {
    setDetailData(null);
  };

  return (
    <Box
      sx={{
        height: '100%',
        boxSizing: 'border-box'
      }}
    >
      <Stack height='100%' spacing="43px">
        <Stack direction={{
          xs: 'column',
          md: 'row'
        }} spacing={{
          xs: 2,
          md: 0,
        }} alignItems={{
          xs: 'center',
          md: 'initial'
        }} textAlign={{
          xs: 'center',
          md: 'left'
        }}>
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
        <Stack height='100%' overflow='auto' spacing="19px">
          <ContentHeading>Your licenses:</ContentHeading>
          <TableContainer component={Paper}>
            <Table  stickyHeader sx={{ minWidth: 768, flex: 1, maxHeight: '100%' }} >
              <THead>
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
                          const statusText = license.is_active ? 'Active' : 'Deactive';
                          return (
                            <>
                              <img
                                width={24}
                                src={`/icons/ic-certificate-${statusText.toLowerCase()}.svg`}
                                alt={"License active"}
                              />
                              <StatusText isActive={license.is_active}>{statusText}</StatusText>
                            </>
                          );
                        })()}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <TableInput value={license.auth_url} disabled />
                    </TableCell>
                    <TableCell>{license.plan_code ?? '﹘'}</TableCell>
                    <TableCell>
                      <ViewDetailBtn onClick={handleViewDetail(license)} variant="text">View detail</ViewDetailBtn>
                    </TableCell>
                    <TableCell>
                      <ChangePlanButton>Change plan</ChangePlanButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <LicenseDetailModal data={detailData} visible={!!detailData} handleClose={handleCloseViewDetail} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default LicenseDetailUI;
