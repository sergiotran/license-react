import { createSlice } from "@reduxjs/toolkit";
import { Role } from '../accounts/account-model';
import { RootState } from '@/app/store';

// Define a type for the slice state
interface PermissionState {
  isLoading: boolean;
  roles: Role[]
}

// Define the initial state using that type
const initialState: PermissionState = {
  isLoading: false,
  roles: []
};

export const permissionSlice = createSlice({
  name: "permission",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    
  },
});

// export const { } = permissionSlice.actions;
export const selecRoleIsLoading = (state: RootState) => state.permission.isLoading;
export const selectRoleList = (state: RootState) => state.permission.roles;

export default permissionSlice.reducer;
