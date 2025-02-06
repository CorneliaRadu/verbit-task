import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string | null;
}

const initialState: UserState = {
  firstName: '',
  lastName: '',
  email: '',
  dateOfBirth: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateProfile } = userSlice.actions;

export const selectUserInitials = (state: RootState) => {
  const first = state.user.firstName.charAt(0).toUpperCase();
  const last = state.user.lastName.charAt(0).toUpperCase();
  return first && last ? `${first}${last}` : '';
};

export default userSlice.reducer;