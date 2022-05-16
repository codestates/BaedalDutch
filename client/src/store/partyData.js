import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  parties: [],
};

export const partyDataSlice = createSlice({
  name: 'partyData',
  initialState,
  reducers: {
    setPartiesAction: (state, action) => {
      state.parties = action.payload;
    },
  },
});

export const { setPartiesAction } = partyDataSlice.actions;

export default partyDataSlice.reducer;
