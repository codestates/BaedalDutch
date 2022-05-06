import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showModal: false,
  showWriteModal: false,
  showMyPageModal: false,
  setNavContainer: null,
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
    showMyPageAction: (state, action) => {
      state.showMyPageModal = action.payload;
    },
    setMyNavDivAction: (state, action) => {
      state.setNavContainer = action.payload;
    },
  },
});

export const { showModalAction, showWriteAction, showMyPageAction, setMyNavDivAction } =
  modalSlice.actions;

export default modalSlice.reducer;
