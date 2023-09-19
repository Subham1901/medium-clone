import { call, put, takeLatest } from "redux-saga/effects";
import { login, signUP } from "../API/AuthAPI";

function* invokeSignup(action) {
  console.log(action);
  const { statusText, message } = yield call(signUP, action.payload);
  console.log(statusText, message);
  if (statusText) {
    yield put({ type: "SIGNUP_SUCCESS", payload: statusText });
  } else {
    yield put({ type: "SIGNUP_FAILED", payload: message });
  }
}

function* invokeLogin(action) {
  const { data, message } = yield call(login, action.payload);
  if (data) {
    yield put({ type: "LOGIN_SUCCESS", payload: data[0] });
  } else {
    yield put({ type: "LOGIN_FAILED", payload: message });
  }
}

function* mediumWatcher() {
  yield takeLatest("USER_SIGNUP", invokeSignup);
  yield takeLatest("USER_LOGIN", invokeLogin);
}

export default mediumWatcher;
