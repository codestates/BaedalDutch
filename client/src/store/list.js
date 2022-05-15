import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showListButton: false,
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    ShowListButtonAction: (state, action) => {
      state.showListButton = action.payload;
    },
  },
});

export const { ShowListButtonAction } = listSlice.actions;

export default listSlice.reducer;
