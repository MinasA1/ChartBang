import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {BrowserRouter as Router} from 'react-router-dom';
import rootReducer, {getUser} from '../reducers';
import {authenticateUser} from '../actions';
import App from './App';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
);

let u = getUser();

if (u) {
  console.log(u);
  store.dispatch(authenticateUser(u));
}

const ChartBang = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

export default ChartBang;
