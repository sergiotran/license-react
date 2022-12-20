import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchAccountsByMerchantId } from '../accounts/account-slice';
import { Account } from '../accounts/account-model';
import { RootState } from '@/app/store';
import { FilterData } from '@/common/hooks/use-account';

// Thunk

// Define a type for the slice state
interface UserState {
  isLoading: boolean;
  users: Account[],
  total: number | null;
  filterData: FilterData;
  pagination: UserPaginationData
  statusSearchText: string;
}

export interface UserPaginationData {
  page: number;
  limit: number;
  total: number;
}

// Define the initial state using that type
const initialState: UserState = {
  isLoading: false,
  users: [],
  total: 0,
  pagination: {
    total: 0,
    page: 1,
    limit: 10
  },
  filterData: {
    username: '',
    email: '',
    status: '',
  },
  statusSearchText: '',
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setPaginationData: (state, action: PayloadAction<Partial<UserPaginationData>>) => {
      state.pagination = {
        ...state.pagination,
        ...action.payload
      };
    },
    setFilterData: (state, action: PayloadAction<Partial<FilterData>>) => {
      state.filterData = {
        ...state.filterData,
        ...action.payload
      };
    },
    setStatusSearchText: (state, action: PayloadAction<Partial<string>>) => {
      state.statusSearchText = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccountsByMerchantId.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchAccountsByMerchantId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.items;
      state.pagination.total = action.payload.total_count;
    })
    builder.addCase(fetchAccountsByMerchantId.rejected, (state) => {
      state.isLoading = false;
    })
  }
});

export const { setFilterData, setStatusSearchText, setPaginationData } = userSlice.actions;

export const selectUserLoading = (state: RootState) => state.user.isLoading;
export const selectUserList = (state: RootState) => state.user.users;
export const selectUserFilterData = (state: RootState) => state.user.filterData;
export const selectUserPaginationData = (state: RootState) => state.user.pagination;
export const selectUserFilterStatusSearchText = (state: RootState) => state.user.statusSearchText;

export default userSlice.reducer;
