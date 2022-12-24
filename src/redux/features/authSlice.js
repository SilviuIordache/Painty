import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { register } from 'dbservices/auth/register';
import { login } from 'dbservices/auth/login';
import { logout } from 'dbservices/auth/logout';
import { resetPassword } from 'dbservices/auth/resetPassword';

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

export const passReset = createAsyncThunk(
  'auth/passReset',
  async ({ email }) => {
    const res = await resetPassword(email);
    return res;
  }
);

const initialState = {
  currentUser: null,
  logged: false,
  error: '',
  message: '',
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
    resetErrorAndMessage: (state) => {
      state.error = '';
      state.message = '';
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
    [passReset.pending]: (state, action) => {
      state.loading = true;
    },
    [passReset.fulfilled]: (state, action) => {
      state.message = 'Check your inbox for further instructions';
      state.loading = false;
    },
    [passReset.rejected]: (state, action) => {
      state.error = 'Failed to reset password';
      state.loading = false;
    },
  },
});

export const { setCurrentUser, resetErrorAndMessage } = authSlice.actions;
export default authSlice.reducer;
