import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showDetail: false,
  partyData: {},
};

export const visibleSlice = createSlice({
  name: 'visible',
  initialState,
  reducers: {
    visibleAction: (state, action) => {
      state.showDetail = action.payload;
    },
    partyDataAction: (state, action) => {
      state.partyData = action.payload;
    },
  },
});

export const { visibleAction, partyDataAction } = visibleSlice.actions;

export default visibleSlice.reducer;
