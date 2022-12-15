import { Button, styled } from "@mui/material";

export const ChangePlanButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.common.white,
  padding: '9px 16px',
  borderRadius: '50px',
  fontWeight: 400,
  fontSize: '15px',
  lineHeight: '20px',
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));
