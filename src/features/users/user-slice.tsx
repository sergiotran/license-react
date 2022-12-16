import { createSlice } from "@reduxjs/toolkit";
import { fetchAccountsByMerchantId } from '../accounts/account-slice';
import { Account } from '../accounts/account-model';

// Thunk

// Define a type for the slice state
interface UserState {
  isLoading: boolean;
  users: Account[],
  filterData: {
    username: string;
    email: string;
    status: boolean | null
  }
}

// Define the initial state using that type
const initialState: UserState = {
  isLoading: false,
  users: [],
  filterData: {
    username: '',
    email: '',
    status: null
  }
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
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

export default userSlice.reducer;
