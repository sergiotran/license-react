import { useAppSelector } from '@/app/store';
import {
  Stack,
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  styled,
  TableHead,
} from "@mui/material";
import React from "react";
import { selectRoleList } from './permission-slice';

const THead = styled(TableHead)({
  backgroundColor: "#8797A1",
});
const TCell = styled(TableCell)({
  fontSize: "15px",
  lineHeight: "20px",
  border: "1px solid #eee",
});
const THeadCell = styled(TCell)({
  color: "#fff",
  fontWeight: 700,
  backgroundColor: "#8797A1",
});

const PermissionManageUI = () => {
  const roleList = useAppSelector(selectRoleList);
  const isEmpty = roleList.length === 0;

  return (
    <Stack spacing="29px">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          fontWeight="400"
          fontSize="24px"
          color="#555"
          lineHeight="33px"
        >
          Role & Permission
        </Typography>
        <Button
          sx={{
            padding: "12px 15px",
            fontSize: "13px",
            fontWeight: 600,
            backgroundColor: "secondary.main",
            color: "common.white",
            "&:hover": {
              backgroundColor: "secondary.main",
              color: "common.white",
            },
          }}
        >
          Add new role
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 768, flex: 1, maxHeight: "100%" }}>
          <THead>
            <TableRow>
              <THeadCell>Role name</THeadCell>
              <THeadCell colSpan={2}>Edit</THeadCell>
              <THeadCell>Delete</THeadCell>
            </TableRow>
          </THead>
          <TableBody>
            {isEmpty && <TableRow>
              <TCell colSpan={4}>
                There is no role available, create one.
              </TCell>
            </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default PermissionManageUI;
