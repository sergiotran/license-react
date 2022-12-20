import { useAppDispatch } from '@/app/store'
import { handleShowSnackbar } from '@/features/snackbar/snackbar-slice';
import React from 'react'

const useSnackbar = () => {
  const dispatch = useAppDispatch();

  const showSuccess = React.useCallback((message: string) => {
    dispatch(handleShowSnackbar({
      type: 'success',
      message
    }));
  }, []);

  const showInfo = React.useCallback((message: string) => {
    dispatch(handleShowSnackbar({
      type: 'info',
      message
    }));
  }, []);

  const showError = React.useCallback((message: string) => {
    dispatch(handleShowSnackbar({
      type: 'error',
      message
    }));
  }, []);

  const showWarning = React.useCallback((message: string) => {
    dispatch(handleShowSnackbar({
      type: 'warning',
      message
    }));
  }, []);

  return { showSuccess, showWarning, showError, showInfo };
}

export default useSnackbar