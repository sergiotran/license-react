import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { RootState } from "../../app/store";
import { Application } from "./application-model";
import { getApplications } from "./application-api";

// Thunk
export const fetchApplications = createAsyncThunk(
  "application/fetchList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getApplications();
      return response;
    } catch (error) {
      const data = (error as AxiosError<{ code: number; message: string }>)
        .response!.data;
      return rejectWithValue(data);
    }
  }
);

// Define a type for the slice state
interface ApplicationsState {
  isLoading: boolean;
  apps: Array<Application>;
}

// Define the initial state using that type
const initialState: ApplicationsState = {
  isLoading: false,
  apps: [],
};

export const accountSlice = createSlice({
  name: "application",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchApplications.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchApplications.fulfilled, (state, action) => {
      state.isLoading = false;
      state.apps = action.payload as Application[];
    });
    builder.addCase(fetchApplications.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const selectApplicationList = (state: RootState) =>
  state.application.apps;

export default accountSlice.reducer;
