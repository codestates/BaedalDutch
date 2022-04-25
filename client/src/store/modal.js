import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showModal: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModalAction: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { showModalAction } = modalSlice.actions;

export default modalSlice.reducer;
