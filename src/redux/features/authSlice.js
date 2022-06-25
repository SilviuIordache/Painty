import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, logout, register } from '../../dbservices/auth.js';

export const signUp = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }) => {
    const res = await register(username, email, password);
    return res;
  }
);

export const signIn = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const res = await login(email, password);
    return res;
  }
);

export const signOut = createAsyncThunk('auth/logout', async () => {
  await logout();
});

const initialState = {
  currentUser: null,
  logged: false,
  error: '',
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.logged = true;
    },
  },
  extraReducers: {
    [signUp.pending]: (state, action) => {
      state.loading = true;
    },
    [signUp.fulfilled]: (state) => {
      state.loading = false;
      state.logged = true;
      state.error = '';
    },
    [signUp.rejected]: (state, action) => {
      state.error = 'Register failed';
      state.loading = false;
    },
    [signIn.pending]: (state, action) => {
      state.loading = true;
    },
    [signIn.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
      state.loading = false;
      state.logged = true;
      state.error = '';
    },
    [signIn.rejected]: (state, action) => {
      state.error = 'Invalid credentials';
      state.loading = false;
    },
    [signOut.pending]: (state, action) => {
      state.loading = true;
    },
    [signOut.fulfilled]: (state, action) => {
      state.currentUser = null;
      state.logged = false;
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
