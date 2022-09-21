import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getImages } from '../../dbservices/images/getImages';

export const fetchImages = createAsyncThunk(
  'images/fetchImages',
  async (payload) => {
    const response = await getImages(payload);
    return response;
  }
);

const initialState = {
  list: [],
  status: 'idle',
  lastImageId: '',
  lastBatchLength: -1
};

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    resetImages: (state, action) => {
      state.list = [];
      state.lastImageId = '';
    },
  },
  extraReducers: {
    [fetchImages.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchImages.fulfilled]: (state, { payload }) => {
      state.list = [...state.list, ...payload.images];
      state.lastImageId = payload.lastImageId;
      state.lastBatchLength = payload.lastBatchLength;
      state.status = 'success';
    },
    [fetchImages.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export default imagesSlice.reducer;

export const { resetImages } = imagesSlice.actions;
