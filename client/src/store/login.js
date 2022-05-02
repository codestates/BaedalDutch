import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    isLoginAction: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { isLoginAction } = loginSlice.actions;

export default loginSlice.reducer;
