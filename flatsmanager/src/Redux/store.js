import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import authReducer from "./AuthReducer/reducer";
import flatReducer from "./FlatReducer/reducer";
//import thunk from "redux-thunk"

import thunk from "redux-thunk";

const rootReducer = combineReducers({ app: authReducer, flat: flatReducer });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

