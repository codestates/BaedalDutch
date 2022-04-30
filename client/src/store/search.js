import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  defaultInput: '',
  searchList: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    inputAction: (state, action) => {
      state.defaultInput = action.payload;
    },
    saveSearchListAction: (state, action) => {
      state.searchList = action.payload;
    },
  },
});

export const { inputAction, saveSearchListAction } = searchSlice.actions;

export default searchSlice.reducer;
