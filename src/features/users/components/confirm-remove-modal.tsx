import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

type Props = {
  open: boolean;
  handleClose: (event: {}, reason?: "backdropClick" | "escapeKeyDown") => void;
};

const RemoveConfirmModal: React.FC<Props> = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
    >
      <DialogTitle>{"ARE YOU SURE?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this record?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} variant='contained' sx={{
          color: 'common.white',
          '&:hover': {
            backgroundColor: 'primary.main',
          }
        }}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveConfirmModal;
