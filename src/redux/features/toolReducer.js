import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tool: 'brush',
  size: require("../../jsons/brushSizes.json").sizes[1],
  color: '#000000'
}

export const toolSlice = createSlice({
  name: 'currentTool',
  initialState,
  reducers: {
    changeTool: (state, action) => {
      state.tool = action.payload;
    }
  }
});

export const { changeTool } = toolSlice.actions

export default toolSlice.reducer