import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showSideBar: true,
};

export const sideSlice = createSlice({
  name: 'side',
  initialState,
  reducers: {
    ShowSideBarAction: (state, action) => {
      state.showSideBar = action.payload;
    },
  },
});

export const { ShowSideBarAction } = sideSlice.actions;

export default sideSlice.reducer;
