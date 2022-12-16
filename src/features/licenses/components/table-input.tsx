import { Input, styled } from '@mui/material';

export const TableInput = styled(Input)({
  width: "100%",
  "&::before": {
    display: 'none'
  },
  "& input": {
    border: "1px solid #E9E9E9",
    padding: "8px 15px",
    borderRadius: "4px",
    color: "#555555",
  },
});