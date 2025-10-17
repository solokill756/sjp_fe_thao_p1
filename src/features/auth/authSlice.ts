import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../models/userModel';

type UserWithoutPassword = Omit<User, 'password'>;

interface AuthState {
  user: UserWithoutPassword | null;
  isAuthenticated: boolean;
}

const loadUserFromStorage = (): UserWithoutPassword | null => {
  try {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      return JSON.parse(storedUser) as UserWithoutPassword;
    }
    return null;
  } catch (error) {
    console.error('Không thể phân tích user từ localStorage', error);

    localStorage.removeItem('loggedInUser');
    return null;
  }
};

const userFromStorage = loadUserFromStorage();

const initialState: AuthState = {
  user: userFromStorage,
  isAuthenticated: !!userFromStorage,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserWithoutPassword>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem('loggedInUser');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
