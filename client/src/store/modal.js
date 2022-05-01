import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showModal: false,
  showWriteModal: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModalAction: (state, action) => {
      state.showModal = action.payload;
    },
    showWriteAction: (state, action) => {
      state.showWriteModal = action.payload;
    },
  },
});

export const { showModalAction, showWriteAction } = modalSlice.actions;

export default modalSlice.reducer;
