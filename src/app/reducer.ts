import accountSlice from '@/features/accounts/account-slice';
import authSlice from '@/features/auth/auth-slice';
import licenseSlice from '@/features/licenses/license-slice';
import snackbarSlice from '@/features/snackbar/snackbar-slice';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: authSlice,
  account: accountSlice,
  snackbar: snackbarSlice,
  license: licenseSlice
});

export default rootReducer;