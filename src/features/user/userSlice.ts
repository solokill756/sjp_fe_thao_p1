import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../../models/userModel';

const initialState: User = {
  id: '',
  username: '',
  email: '',
  password: '',
  role: 'customer',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
