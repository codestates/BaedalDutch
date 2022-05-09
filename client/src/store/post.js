import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: '',
  food_category: '',
  member_num: '',
  lat: '',
  lng: '',
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    postAction: (state, action) => {
      state.address = action.payload.address;
      state.food_category = action.payload.food_category;
      state.member_num = action.payload.member_num;
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});

export const { inputAction } = postSlice.actions;

export default postSlice.reducer;
