import { takeLatest, call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  DEFAULT_ACTION,
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_FAILURE,
  LOGOUT,
  AUTH_CHECK,
} from './constants';
import {
  USER_LIST,
  USER_DATA,
} from './mockedupServer'
import indexDB from 'localforage';
import { submit, submitSuccess, submitFailure, logout, logoutSuccess, authSuccess } from './actions';
const wait = (ms) => (
  new Promise((resolve) => {
    setTimeout(() => resolve(), ms*1000);
  })
);

export function* loginFlow(action) {
    yield call(wait, Math.floor(Math.random() * Math.floor(3))); // random server delay between 1-3 sec
    if (USER_LIST[action.value.name] === action.value.password) {
      const userData = USER_DATA.filter(item => item.userId === action.value.name);
      userData.length ? (yield put(submitSuccess(userData[0]))):(yield put(submitFailure('Something Went Wrong')))
        yield [
          indexDB.setItem('auth', true),
          indexDB.setItem('user', userData[0])
        ];
  } else {
    yield put(submitFailure('Username/Password mismatch'));
  }
}

export function* authcheckFlow() {
    const auth = yield indexDB.getItem('auth', (value) => value);
    if (auth) {
      console.log('User logged in');
      const userData = yield indexDB.getItem('user', (value) => value);
      yield put(authSuccess(userData));
    } else {
      console.log('User is not logged In');
    }
}

export function* logoutFlow(action) {
    yield call(wait, Math.floor(Math.random() * Math.floor(3))); // random server delay between 1-3 sec
    yield [
      indexDB.removeItem('auth'),
      indexDB.removeItem('user'),
    ];
    yield put(logoutSuccess());
}

export default function* loginPageSaga() {
  yield takeLatest(SUBMIT_FORM, loginFlow);
  yield takeLatest(LOGOUT, logoutFlow);
  yield takeLatest(AUTH_CHECK, authcheckFlow);
  // yield takeLatest(CREATE_CASE, submitCase);
}
