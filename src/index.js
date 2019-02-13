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

const middleware = [reduxThunk];

if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(reducers, initialState, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
