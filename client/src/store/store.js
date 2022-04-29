import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modal';
import loginReducer from './login';
import chatReducer from './chat';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    login: loginReducer,
  },
});
