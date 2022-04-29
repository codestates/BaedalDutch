import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modal';
import loginReducer from './login';
import inputReducer from './input';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    login: loginReducer,
    input: inputReducer,
  },
});
