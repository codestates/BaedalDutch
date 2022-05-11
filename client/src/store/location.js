import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lat: '',
  lng: '',
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    currentLocationAction: (state, action) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});

export const { currentLocationAction } = locationSlice.actions;

export default locationSlice.reducer;
