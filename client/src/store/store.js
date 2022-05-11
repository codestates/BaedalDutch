import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modal';
import loginReducer from './login';
import chatReducer from './chat';
import searchReducer from './search';
import locationReducer from './location';
import visibleReducer from './visible';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

export const reducers = combineReducers({
  modal: modalReducer,
  login: loginReducer,
  chat: chatReducer,
  search: searchReducer,
  location: locationReducer,
  visible: visibleReducer,
});

const persistConfig = { key: 'root', storage };

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});
