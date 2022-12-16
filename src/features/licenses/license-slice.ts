import { RootState } from "@/app/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getLicenses } from "./license-api";
import type { License } from './license-model';

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
export type LicenseByApp = {
  name: string;
  id: string;
  logo: string;
  plan: string;
  licenses: License[];
};

interface LicenseState {
  isLoading: boolean,
  items: License[],
  selectedItem: LicenseByApp | null
}


// Define the initial state using that type
const initialState: LicenseState = {
  isLoading: false,
  items: [],
  selectedItem: null
};

export const licenseSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    selectLicenseDetail: (state, action: PayloadAction<LicenseByApp | null>) => {
      state.selectedItem = action.payload;
    }
  },
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

export const { selectLicenseDetail } = licenseSlice.actions;

export const selectIsLicenseLoading = (state: RootState) =>
  state.license.items;
export const selectLicenses = (state: RootState) => state.license.items;
export const selectedLicenceDetail = (state: RootState) => state.license.selectedItem;

export default licenseSlice.reducer;
