import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  message: '',
  type: 'info',
};

export const snackBarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackBar: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    closeSnackBar: (state) => {
      state.open = false;
      state.message = '';
    },
  },
});

export const {openSnackBar, closeSnackBar} = snackBarSlice.actions;
export default snackBarSlice.reducer;