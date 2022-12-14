import { RootState } from "@/app/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getLicenses } from "./license-api";
import type { License } from './license-mode';

// Thunk
export const fetchLicenses = createAsyncThunk(
  "auth/login",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLicenses();
      return response;
    } catch (error) {
      const data = (error as AxiosError<{ code: number; message: string }>)
        .response!.data;
      return rejectWithValue(data);
    }
  }
);

// Define a type for the slice state
interface LicenseState {
  isLoading: boolean,
  items: License[]
}

// Define the initial state using that type
const initialState: LicenseState = {
  isLoading: false,
  items: [],
};

export const licenseState = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Auth Login
    builder.addCase(fetchLicenses.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLicenses.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.isLoading = false;
    });
    builder.addCase(fetchLicenses.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const selectIsLicenseLoading = (state: RootState) =>
  state.license.items;
export const selectLicenses = (state: RootState) => state.license.items;

export default licenseState.reducer;
