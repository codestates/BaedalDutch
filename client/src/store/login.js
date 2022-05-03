import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: true,
  loginUser: [],
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    isLoginAction: (state, action) => {
      state.isLogin = action.payload;
    },
    loginUserAction: (state, action) => {
      state.loginUser = action.payload;
    },
  },
});

export const { isLoginAction, loginUserAction } = loginSlice.actions;

export default loginSlice.reducer;
