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
import { THead, THeadCell } from '../licenses/license-detail';

const UserManageUI = () => {
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
                <THeadCell>License status</THeadCell>
                <THeadCell>Base url</THeadCell>
                <THeadCell>Plan</THeadCell>
                <THeadCell>View detail</THeadCell>
                <THeadCell>Change plan</THeadCell>
              </TableRow>
            </THead>
            <TableBody>
              <TableRow
                // key={license.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Stack direction="row" spacing="14px">
                    123
                  </Stack>
                </TableCell>
                <TableCell>123</TableCell>
                <TableCell>{"﹘"}</TableCell>
                <TableCell>123</TableCell>
                <TableCell>
                  <ChangePlanButton>Change plan</ChangePlanButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
};

export default UserManageUI;
