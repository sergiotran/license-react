import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { RootState } from "../../app/store";
import { Account } from "./account-model";
import { GetAccountListResponse, getAccount, getAccounts, updateAccount } from "./account-api";
import { FetchAccounts } from '@/common/hooks/use-account';

// Thunk
export const fetchAccountsByMerchantId = createAsyncThunk(
  "account/fetchAccountsByMerchantId",
  async (
    {
      page = 1,
      limit = 10,
      merchant_id,
      filterData
    }: FetchAccounts,
    { rejectWithValue }
  ) => {
    try {
      const response = await getAccounts(page, limit, merchant_id, filterData);
      return response as GetAccountListResponse;
    } catch (error) {
      const data = (error as AxiosError<{ code: number; message: string }>)
        .response!.data;
      return rejectWithValue(data);
    }
  }
);

export const fetchAccountById = createAsyncThunk(
  "account/fetchAccountById",
  async (accountId: string, { rejectWithValue }) => {
    try {
      const response = await getAccount(accountId);
      return response;
    } catch (error) {
      const data = (error as AxiosError<{ code: number; message: string }>)
        .response!.data;
      return rejectWithValue(data);
    }
  }
);

export const updateAccountInfo = createAsyncThunk(
  "account/updateAccountInfo",
  async (data: Partial<Account>, { rejectWithValue }) => {
    try {
      const response = await updateAccount(data.id!, data);
      return response as Account;
    } catch (error) {
      const data = (error as AxiosError<{ code: number; message: string }>)
        .response!.data;
      return rejectWithValue(data);
    }
  }
);

// Define a type for the slice state
interface AccountState {
  isLoading: boolean;
  accountId: string | null;
  accountData: Account | null;
}

// Define the initial state using that type
const initialState: AccountState = {
  isLoading: true,
  accountId: null,
  accountData: null,
};

export const accountSlice = createSlice({
  name: "account",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAccountId: (state, action: PayloadAction<string>) => {
      state.accountId = action.payload;
    },
    setAccountData: (state, action: PayloadAction<Account>) => {
      state.accountData = {
        ...state.accountData,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchAccountById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAccountById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.accountData = action.payload as Account;
    });
    builder.addCase(fetchAccountById.rejected, (state) => {
      state.isLoading = false;
    });
    // Update
    builder.addCase(updateAccountInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateAccountInfo.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateAccountInfo.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setAccountId, setAccountData } = accountSlice.actions;

export const selectAccountId = (state: RootState) => state.account.accountId;
export const selectAccountData = (state: RootState) =>
  state.account.accountData;
export const selectAccountLoading = (state: RootState) =>
  state.account.isLoading;

export default accountSlice.reducer;
