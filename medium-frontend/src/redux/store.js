import { createStore, applyMiddleware } from "redux";
import sagaMiddleware from "redux-saga";
import mediumWatcher from "./sagaWatcher";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./authReducer";
const createSagaMiddleware = sagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(createSagaMiddleware))
);

createSagaMiddleware.run(mediumWatcher);

export default store;
