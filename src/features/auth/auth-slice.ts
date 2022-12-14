import { RootState } from '@/app/store';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from 'axios';
import { login, LoginPayload, LoginResponse } from "./auth-api";

// Thunk
export const authLogin = createAsyncThunk(
  "auth/login",
  async (payload: Partial<LoginPayload>, { rejectWithValue }) => {
    try {
      const response = await login(payload);
     return response; 
    } catch (error) {
      const data = (error as AxiosError<{code: number, message: string}>).response!.data;
      return rejectWithValue(data);
    }
  }
);

// Define a type for the slice state
interface AuthState {
  isProcessing: boolean;
  loginPayload: LoginPayload;
  loginResponse: LoginResponse | null
}

// Define the initial state using that type
const initialState: AuthState = {
  isProcessing: false,
  loginPayload: {
    merchant_id: null,
    store_id: null,
    username: "",
    password: "",
    token: null,
    pin_code: "",
    type: null,
    app_id: null,
    redirect_url: null,
  },
  loginResponse: null
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    // Auth Login
    builder.addCase(authLogin.pending, (state) => {
      state.isProcessing = true;
    });
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.loginResponse = action.payload;
      state.isProcessing = false;
    });
    builder.addCase(authLogin.rejected, (state) => {
      state.isProcessing = false;
    });
  },
});

export const selectIsProcessingAuthentication = (state: RootState) => state.auth.isProcessing;

export default authSlice.reducer;
