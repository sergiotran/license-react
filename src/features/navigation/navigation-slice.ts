import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state
interface NavigationState {
  isOpen: boolean;
  isFixed: boolean;
}

// Define the initial state using that type
const initialState: NavigationState = {
  isOpen: true,
  isFixed: false,
};

export const navigationSlice = createSlice({
  name: "navigation",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleNavigationOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
    setNavigationState: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setIsNavigationFixed: (state, action: PayloadAction<boolean>) => {
      state.isFixed = action.payload;
    }
  },
});

export const { toggleNavigationOpen, setNavigationState, setIsNavigationFixed } = navigationSlice.actions;

export const selectIsNavigationOpen = (state: RootState) => state.navigation.isOpen;
export const selectIsNavigationFixed = (state: RootState) => state.navigation.isFixed;

export default navigationSlice.reducer;
