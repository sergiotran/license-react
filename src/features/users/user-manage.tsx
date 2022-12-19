import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import React from "react";
import UserFilterPanel from "./components/user-filter-panel";
import { ChangePlanButton } from "../licenses/components/change-plan-btn";
import { THead, THeadCell } from "../licenses/license-detail";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { fetchAccountsByMerchantId, selectAccountData } from "../accounts/account-slice";
import { selectUserFilterData, selectUserList } from "./user-slice";

const UserManageUI = () => {
  const dispatch = useAppDispatch();
  const accountData = useAppSelector(selectAccountData);
  const filterData = useAppSelector(selectUserFilterData);
  const userList = useAppSelector(selectUserList);

  React.useEffect(() => {
    dispatch(fetchAccountsByMerchantId({
      page: 1,
      limit: 10,
      merchant_id: accountData!.merchant_id,
      filterData,
    }))
  }, [filterData])

  return (
    <Box>
      <Stack direction="column" spacing="20px">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            component="h4"
            fontWeight={400}
            fontSize="24px"
            lineHeight="33px"
            color="#555555"
          >
            All Users
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "secondary.main",
              padding: "12px 15px",
              "&:hover": {
                backgroundColor: "secondary.main",
              },
            }}
          >
            <PersonAddIcon htmlColor="#fff" sx={{ marginRight: 1 }} />
            <Typography fontSize="13px" component="span" color="common.white">
              Create new
            </Typography>
          </Button>
        </Stack>
        <UserFilterPanel />
        <TableContainer component={Paper}>
          <Table
            stickyHeader
            sx={{ minWidth: 768, flex: 1, maxHeight: "100%" }}
          >
            <THead>
              <TableRow>
                <THeadCell>Name</THeadCell>
                <THeadCell>Username</THeadCell>
                <THeadCell>Email</THeadCell>
                <THeadCell>View detail</THeadCell>
                <THeadCell>Change plan</THeadCell>
              </TableRow>
            </THead>
            <TableBody>
              {userList.map((user) => <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Stack direction="row" spacing="14px">
                    {user.name}
                  </Stack>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <ChangePlanButton>Change plan</ChangePlanButton>
                </TableCell>
              </TableRow>)}
              
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
};

export default UserManageUI;
