import {
  Box,
  Button,
  CircularProgress,
  NativeSelect,
  Pagination,
  PaginationItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import React from "react";
import UserFilterPanel from "./components/user-filter-panel";
import RemoveConfirmModal from "./components/confirm-remove-modal";
import { useNavigate } from "react-router-dom";
import useUser from "@/common/hooks/use-user";
import useAccount from "@/common/hooks/use-account";

const ActionButton = styled(Button)({
  textDecoration: "underline",
  color: "#0072bc",
  textTransform: "capitalize",
  "&:hover": {
    color: "#0072bc",
    textDecoration: "underline",
    background: "transparent",
  },
});
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

const USER_LIMITS = [10, 20, 30, 40];

const UserManageUI = () => {
  const {
    filterData,
    paginationData,
    userList,
    isLoading,
    updatePaginationData,
  } = useUser();
  const { accountDetail, fetchAccounts } = useAccount();
  const navigate = useNavigate();

  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(
    null
  );

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    updatePaginationData({
      page: value,
    });
  };

  const handleChangeLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updatePaginationData({
      limit: +event.target.value,
    });
  };

  const handlerRemoveUser = (userId: string) => () => setSelectedUserId(userId);
  const handleCloseUserRemoveModal = () => setSelectedUserId(null);
  const handleCreateNew = () => navigate("/settings/users/create");
  const handleEditUser = (userId: string) => () =>
    navigate(`/settings/users/${userId}/detail`);

  React.useEffect(() => {
    if (accountDetail)
      fetchAccounts({
        page: paginationData.page,
        limit: paginationData.limit,
        merchant_id: accountDetail!.merchant_id,
        filterData,
      });
  }, [filterData, paginationData, accountDetail]);

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
            onClick={handleCreateNew}
          >
            <PersonAddIcon htmlColor="#fff" sx={{ marginRight: 1 }} />
            <Typography fontSize="13px" component="span" color="common.white">
              Create new
            </Typography>
          </Button>
        </Stack>
        <UserFilterPanel />
        {(!isLoading && (
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
                  <THeadCell>Roles</THeadCell>
                  <THeadCell>Status</THeadCell>
                  <THeadCell align="center">Action</THeadCell>
                </TableRow>
              </THead>
              <TableBody>
                {userList.map((user) => (
                  <TableRow key={user.id}>
                    <TCell component="th" scope="row">
                      <Stack direction="row" spacing="14px">
                        {user.name}
                      </Stack>
                    </TCell>
                    <TCell>{user.username}</TCell>
                    <TCell>{user.email}</TCell>
                    <TCell>{(user.role && user.role.name) || "-"}</TCell>
                    <TCell>{(user.status && user.status) || "-"}</TCell>
                    <TCell>
                      <Stack
                        direction="row"
                        width="100%"
                        justifyContent="space-around"
                      >
                        <ActionButton
                          variant="text"
                          onClick={handleEditUser(user.id)}
                        >
                          Edit
                        </ActionButton>
                        <ActionButton
                          onClick={handlerRemoveUser(user.id)}
                          variant="text"
                        >
                          Remove
                        </ActionButton>
                      </Stack>
                    </TCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )) || (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Stack spacing={0} direction="row" justifyContent="space-between">
          <Pagination
            sx={{
              border: "1px solid #eee",
              "& .Mui-selected": {
                backgroundColor: "#337ab7!important",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#337ab7",
                  color: "#fff",
                },
              },
              "& .MuiPaginationItem-root": {
                margin: 0,
                borderRadius: 0,
                border: "none",
              },
            }}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            count={Math.ceil(paginationData.total / paginationData.limit)}
            renderItem={(item) => <PaginationItem {...item} />}
          />
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            fontSize="15px"
            lineHeight="20px"
          >
            <span>Show</span>
            <NativeSelect
              sx={{
                border: "1px solid #3C3C434D",
                borderRadius: "4px",
                height: "29px",
                "& select": {
                  padding: "2px 5px",
                },
                "&::before, &::after": {
                  display: "none",
                },
              }}
              defaultValue={USER_LIMITS[0]}
              variant="standard"
              onChange={handleChangeLimit}
            >
              {USER_LIMITS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </NativeSelect>
            <span>entries</span>
          </Stack>
        </Stack>
      </Stack>
      <RemoveConfirmModal
        open={!!selectedUserId}
        handleClose={handleCloseUserRemoveModal}
      />
    </Box>
  );
};

export default UserManageUI;
