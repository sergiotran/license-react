import { styled } from "@mui/material";

export const StatusText = styled("span", {
  shouldForwardProp: (props) => props !== "isActive",
})<{ isActive: boolean }>(({ theme, isActive = false }) => ({
  fontWeight: 400,
  fontSize: "15px",
  lineHeight: "20px",
  color: isActive ? theme.palette.primary.main : "#757474",
}));
