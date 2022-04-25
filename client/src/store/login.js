import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    showMypage: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { showModalAction } = loginSlice.actions;

export default loginSlice.reducer;
