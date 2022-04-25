import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

const rootNode = document.getElementById('root');

ReactDOM.createRoot(rootNode).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
