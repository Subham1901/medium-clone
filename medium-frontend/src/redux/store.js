import { createStore, applyMiddleware } from "redux";
import sagaMiddleware from "redux-saga";
import authReducer from "./authReducer";
import mediumWatcher from "./sagaWatcher";
import { composeWithDevTools } from "redux-devtools-extension";
const createSagaMiddleware = sagaMiddleware();
const store = createStore(
  authReducer,
  composeWithDevTools(applyMiddleware(createSagaMiddleware))
);

createSagaMiddleware.run(mediumWatcher);

export default store;
