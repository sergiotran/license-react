import accountSlice from '@/features/accounts/account-slice';
import applicationSlice from '@/features/application/application-slice';
import authSlice from '@/features/auth/auth-slice';
import licenseSlice from '@/features/licenses/license-slice';
import navigationSlice from '@/features/navigation/navigation-slice';
import snackbarSlice from '@/features/snackbar/snackbar-slice';
import userSlice from '@/features/users/user-slice';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: authSlice,
  account: accountSlice,
  snackbar: snackbarSlice,
  license: licenseSlice,
  navigation: navigationSlice,
  application: applicationSlice,
  user: userSlice
});

export default rootReducer;