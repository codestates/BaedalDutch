import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isChat: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    isChatAction: (state, action) => {
      state.isChat = action.payload;
    },
  },
});

export const { isChatAction } = chatSlice.actions;

export default chatSlice.reducer;
