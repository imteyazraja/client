import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import logger from "redux-logger";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

//const store = createStore(() => [], {}, applyMiddleware());

//const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const initialState = {};

const middleware = [reduxThunk, logger];

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
