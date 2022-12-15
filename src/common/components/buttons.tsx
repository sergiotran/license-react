import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material";

const FormButton = styled(LoadingButton)({
  padding: "12px 15px",
  textTransform: "uppercase",
  minWidth: 140,
  fontSize: 13,
  fontWeight: 600,
});

export const ResetButton = styled(FormButton)(() => ({
  backgroundColor: "#ebebeb",
  color: "#333",
  "&:hover": {
    backgroundColor: "#ebebeb",
    color: "#333",
  },
}));

export const SaveButton = styled(FormButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
}));
