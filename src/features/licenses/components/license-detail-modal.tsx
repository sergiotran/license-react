import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Slide,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { License } from "../license-model";
import { StatusText } from "./status-text";
import { TableInput } from "./table-input";
import { format } from "date-fns";

type Props = {
  data: License | null;
  visible: boolean;
  handleClose: (event: {}, reason?: "backdropClick" | "escapeKeyDown") => void;
};

const ChangePlanButton = styled(Button)(({ theme }) => ({
  padding: "16px 24px",
  fontWeight: 700,
  fontSize: "15px",
  lineHeight: "20px",
  minHeight: "initial",
  height: "auto",
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
}));

const PlanTitle = styled("h3")(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 700,
  color: theme.palette.primary.main,
  lineHeight: "24px",
  margin: 0,
}));
const PlanSubTitle = styled("span")(({ theme }) => ({
  fontSize: "15px",
  fontWeight: 400,
  color: "#555555",
  lineHeight: "20px",
}));

const InforCell = styled(TableCell)({
  borderBottom: "none",
  color: "#555555",
  padding: "9px 0",
});
const InforKeyCell = styled(InforCell)({
  fontWeight: "bold",
  width: "200px",
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LicenseDetailModal: React.FC<Props> = ({
  visible: open,
  handleClose,
  data,
}) => {
  const [expiryDate, setExpiryDate] = React.useState<string>('');
  const [purchaceDate, setPurchaseDate] = React.useState<string>('');
  const [lastInvoice, setLastInvoice] = React.useState<string>('');
  const [dayRemaining, setDayRemaining] = React.useState<number>(0);

  React.useEffect(() => {
    if(!data) return;
    const dateFormat = 'dd-MMM-yyyy';
    // Expiry date
    if(data.expiry_date)
      setExpiryDate(format(new Date(data.created_at), dateFormat))
    // Purchase date
    if(data.created_at)
      setPurchaseDate(format(new Date(data.created_at), dateFormat));
    // Last invoice
    if(data.last_purchase)
      setLastInvoice(format(new Date(data.last_purchase), dateFormat));
    // Day remaining
    // Todo: Create logic for calculating date remaining
  }, [data]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
    >
      <DialogTitle
        sx={{
          padding: "35px 34px",
          width: "630px",
          maxWidth: "100%",
          alignItems: "center",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack direction="row" spacing="19px">
            <img
              width={64}
              src={`/icons/ic-certificate-${
                data?.is_active ? "active" : "deactive"
              }.svg`}
            />
            {!!data?.plan_code && !!expiryDate && <Stack>
              <PlanTitle>Premium plan</PlanTitle>
              <PlanSubTitle>Expiry date: {data?.expiry_date}</PlanSubTitle>
            </Stack>}
          </Stack>
          <ChangePlanButton>Change Plan</ChangePlanButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ padding: 0 }}>
        <Divider />
        <DialogContentText
          sx={{
            padding: "15px 34px",
          }}
          component='div'
        >
          <TableContainer>
            <Table>
              <TableHead
                sx={{
                  display: "none",
                }}
              />
              <TableBody>
                <TableRow>
                  <InforKeyCell variant="head">Status</InforKeyCell>
                  <InforCell>
                    <StatusText isActive={data?.is_active ?? false}>
                      {data?.is_active ? "Active" : "Deactive"}
                    </StatusText>
                  </InforCell>
                </TableRow>
                <TableRow>
                  <InforKeyCell variant="head">Base Url</InforKeyCell>
                  <InforCell>
                    <TableInput disabled value={data?.auth_url || ''} />
                  </InforCell>
                </TableRow>
                <TableRow>
                  <InforKeyCell variant="head">Purchase date</InforKeyCell>
                  <InforCell>{purchaceDate}</InforCell>
                </TableRow>
                {!!dayRemaining && <TableRow>
                  <InforKeyCell variant="head">Day remaining</InforKeyCell>
                  <InforCell>{dayRemaining}</InforCell>
                </TableRow>}
                {!!lastInvoice && <TableRow>
                  <InforKeyCell variant="head">Last invoice</InforKeyCell>
                  <InforCell>{lastInvoice}</InforCell>
                </TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default LicenseDetailModal;
