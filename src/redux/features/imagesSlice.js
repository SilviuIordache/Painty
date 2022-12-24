import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getImages } from 'dbservices/images/getImages';

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
  lastBatchLength: -1,
  firstBatchRetrieved: false,
};

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    resetBatchRetrieved: (state) => {
      state.firstBatchRetrieved = false;
    },
    deleteImageFromStore: (state, { payload }) => {
      const index = state.list.findIndex((item) => item.id === payload)
      state.list.splice(index, 1);
    }
  },
  extraReducers: {
    [fetchImages.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchImages.fulfilled]: (state, { payload }) => {
      
      if (!state.firstBatchRetrieved) {
        state.firstBatchRetrieved = true;
        state.list = [];
        state.lastImageId = '';
        state.lastBatchLength = -1
      }

      state.list = [...state.list, ...payload.images];
      state.lastImageId = payload.lastImageId;
      state.lastBatchLength = payload.lastBatchLength;

      state.status = 'success';
    },
    [fetchImages.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export default imagesSlice.reducer;

export const { resetBatchRetrieved, deleteImageFromStore } = imagesSlice.actions;
