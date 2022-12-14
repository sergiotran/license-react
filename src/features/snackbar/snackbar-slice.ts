import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { AlertColor } from "@mui/material";

// Define a type for the slice state
interface SnackbarState {
  type: AlertColor;
  message: string | null;
  isOpen: boolean;
}

// Define the initial state using that type
const initialState: SnackbarState = {
  type: "info",
  isOpen: false,
  message: null,
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSnackbarState: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
    handleShowSnackbar: (
      state,
      action: PayloadAction<{
        type?: AlertColor;
        message: string;
      }>
    ) => {
      state.isOpen = true;
      state.type = action.payload.type || 'info';
      state.message = action.payload.message;
    },
  },
});

export const { handleShowSnackbar, setSnackbarState } = snackbarSlice.actions;

export const selectSnackbarState = (state: RootState) => state.snackbar.isOpen;
export const selectSnackbarData = (state: RootState) => ({
  message: state.snackbar.message,
  type: state.snackbar.type,
});

export default snackbarSlice.reducer;
