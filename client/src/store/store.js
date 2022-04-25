import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modal';
import loginReducer from './login';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    login: loginReducer,
  },
});
