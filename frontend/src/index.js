import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ModalProvider } from './context/Modal';

import * as sessionActions from './store/session';
import * as spotActions from './store/spots';
import * as singleSpotActions from './store/singlespot';
import * as reviewActions from './store/reviews'
import './index.css';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;

  window.sessionActions = sessionActions;
  window.spotActions = spotActions;
  window.singleSpotActions = singleSpotActions;
  window.reviewActions = reviewActions;
}

function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
