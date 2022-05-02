import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  defaultInput: '',
};

export const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    inputAction: (state, action) => {
      state.defaultInput = action.payload;
    },
  },
});

export const { inputAction } = inputSlice.actions;

export default inputSlice.reducer;
