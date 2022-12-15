import {
  Box,
  FormLabel,
  Stack,
  styled,
  Switch,
  SwitchProps,
} from "@mui/material";
import React from "react";

type Props = { label: string } & SwitchProps;

const SwitchComponent = styled(Switch)(({ theme }) => ({
  
}));
const SwitchLabel = styled(FormLabel)({
  fontWeight: 700,
  textTransform: "uppercase",
  fontSize: "16px",
  color: "#555",
  margin: "20px 0",
});
const SwitchSubLabel = styled("span")({
  fontWeight: 600,
  color: "#818181",
  flexBasis: "190px",
});

const Switcher: React.FC<Props> = React.forwardRef(function _Switcher({
  label,
  ...props
}: Props, ref) {
  return (
    <Stack width="100%">
      <SwitchLabel>{label}</SwitchLabel>
      <Stack direction="row" width="100%" justifyContent="space-between">
        <SwitchSubLabel>Active</SwitchSubLabel>
        <Box display="flex" justifyContent="flex-start" flex="1">
          <SwitchComponent ref={ref} {...props} />
        </Box>
      </Stack>
    </Stack>
  );
});

export default Switcher;
