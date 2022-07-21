import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import reducers from "./reducers";
import sagas from "./sagas";

import { success } from "redux-saga-requests";

export const APP_INIT = "APP_INIT";

const sagaMiddleware = createSagaMiddleware();

const composedEnhancers = composeWithDevTools(
  applyMiddleware(...[sagaMiddleware])
);

const reducer = combineReducers(reducers);

const rootReducer = (state = {}, action) => {
  let newState;
  const { home, ...rest } = state;
  // if (action.type === success(USER_LOG_OUT)) {    
  //   newState = {
  //     login
  //   };
  // }else{
  //   newState = state;
  // }
    newState = state;
  // console.log(reducer);
  return reducer(newState, action);
};

export const store = createStore(rootReducer, composedEnhancers);

sagaMiddleware.run(sagas);

export default store;
