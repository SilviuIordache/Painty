import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getImages } from '../../dbservices/images.js';

export const fetchImages = createAsyncThunk('images/fetchImages', async (userId) => {
  const response = await getImages(userId);
  return response
});

const initialState = {
  list: [],
  status: 'idle',
};

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  extraReducers: {
    [fetchImages.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchImages.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = 'success'
    },
    [fetchImages.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export default imagesSlice.reducer;
