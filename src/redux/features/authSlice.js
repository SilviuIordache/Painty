import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, logout } from '../../dbservices/auth.js';

export const signIn = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const res = await login(email, password);
    return res;
  }
);

export const signOut = createAsyncThunk(
  'auth/logout',
  async () => {
    await logout();
  }
)
const initialState = {
  currentUser: null,
  error: '',
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: {
    [signIn.pending]: (state, action) => {
      state.loading = true;
    },
    [signIn.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
      state.loading = false;
      state.error = '';
    },
    [signIn.rejected]: (state, action) => {
      state.error = 'Invalid credentials'
      state.loading = false;
    },
    [signOut.pending]: (state, action) => {
      state.loading = true;
    },
    [signOut.fulfilled]: (state, action) => {
      state.currentUser = null;
      state.loading = false;
    },
    [signOut.rejected]: (state, action) => {
      state.error = 'Sign out failed';
      state.loading = false;
    },
  },
});

export const { setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
