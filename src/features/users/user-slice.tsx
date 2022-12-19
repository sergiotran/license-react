import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchAccountsByMerchantId } from '../accounts/account-slice';
import { Account } from '../accounts/account-model';
import { RootState } from '@/app/store';

// Thunk

// Define a type for the slice state
interface UserState {
  isLoading: boolean;
  users: Account[],
  filterData: Partial<FilterData>
}
export interface FilterData {
  username: string;
  email: string;
  status: string;
  statusSearchText: string;
}

// Define the initial state using that type
const initialState: UserState = {
  isLoading: false,
  users: [],
  filterData: {
    username: '',
    email: '',
    status: '',
    statusSearchText: ''
  }
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setFilterData: (state, action: PayloadAction<Partial<FilterData>>) => {
      state.filterData = {
        ...state.filterData,
        ...action.payload
      };
    },
    setStatusSearchText: (state, action: PayloadAction<Partial<string>>) => {
      state.filterData.statusSearchText = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccountsByMerchantId.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchAccountsByMerchantId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload as Account[]
    })
    builder.addCase(fetchAccountsByMerchantId.rejected, (state) => {
      state.isLoading = false;
    })
  }
});

export const { setFilterData, setStatusSearchText } = userSlice.actions;

export const selectUserFilterData = (state: RootState) => state.user.filterData;
export const selectUserFilterStatusSearchText = (state: RootState) => state.user.filterData.statusSearchText;

export default userSlice.reducer;
