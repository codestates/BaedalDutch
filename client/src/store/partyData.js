import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  parties: [],
};

export const partyDataSlice = createSlice({
  name: 'partyData',
  initialState,
  reducers: {
    setPartiesAction: (state, action) => {
      console.log('실행은되는지');
      console.log('redux데어투', action.payload);
      state.parties = action.payload;
    },
  },
});

export const { setPartiesAction } = partyDataSlice.actions;

export default partyDataSlice.reducer;
