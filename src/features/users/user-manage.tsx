import { Box, Button, Stack, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import React from "react";
import UserFilterPanel from './components/user-filter-panel';

const UserManageUI = () => {
  return (
    <Box>
      <Stack direction='column' spacing='20px'>
        <Stack direction="row" justifyContent="space-between" alignItems='center'>
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
            <Typography fontSize='13px' component="span" color="common.white">
              Create new
            </Typography>
          </Button>
        </Stack>
        <UserFilterPanel />
      </Stack>
    </Box>
  );
};

export default UserManageUI;
