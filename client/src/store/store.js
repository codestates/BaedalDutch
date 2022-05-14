import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modal';
import loginReducer from './login';
import chatReducer from './chat';
import searchReducer from './search';
import locationReducer from './location';
import visibleReducer from './visible';
import partyDataReducer from './partyData';
<<<<<<< HEAD
=======
import sideBarReducer from './side';
>>>>>>> 47b7b563e5c72c238c61a18b3b55218e99a13228
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
  partyData: partyDataReducer,
<<<<<<< HEAD
=======
  side: sideBarReducer,
>>>>>>> 47b7b563e5c72c238c61a18b3b55218e99a13228
});

const persistConfig = { key: 'root', storage };

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});
