import { useAppDispatch, useAppSelector } from '@/app/store';
import { Snackbar, Alert } from '@mui/material';
import React from "react";
import { selectSnackbarData, selectSnackbarState, setSnackbarState } from './snackbar-slice';

const SnackbarNoti = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectSnackbarState);
  const { message, type } = useAppSelector(selectSnackbarData);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setSnackbarState(false));
  };

  return (
    <Snackbar open={open} anchorOrigin={{
      horizontal: 'center',
      vertical: 'top'
    }} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNoti;
