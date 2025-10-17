import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../models/userModel';

type UserWithoutPassword = Omit<User, 'password'>;

interface AuthState {
  user: UserWithoutPassword | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
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
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserWithoutPassword>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },

    logOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('loggedInUser');
    },
  },
});

export const { setCredentials, logOut, setLoading, setError } =
  authSlice.actions;
export default authSlice.reducer;
