/*
 *
 * WelcomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SUBMIT_FORM,
  LOGOUT,
  LOGOUT_SUCCESS,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_FAILURE,
  OPEN_FORM,
  CLOSE_FORM,
  DISPLAY_ERROR,
  AUTH_CHECK,
  AUTH_SUCCESS,
} from './constants';

export const initialState = fromJS({
  auth: false,
  fopen: false,
  userData: {},
  loading: false,
  errText: '',
});

function welcomePageReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_FORM:
      return state.set('loading', true);
    case SUBMIT_FORM_FAILURE:
        return state
          .set('errText', action.value)
          .set('loading', false);
    case LOGOUT_SUCCESS:
        return state
          .set('auth', false)
          .set('userData', {})
          .set('loading', false);
    case SUBMIT_FORM_SUCCESS:
        return state
          .set('auth', true)
          .set('errText', '')
          .set('fopen', false)
          .set('userData', action.value)
          .set('loading', false);
    case AUTH_SUCCESS:
      return state
          .set('auth', true)
          .set('userData', action.value);
    case LOGOUT:
      return state.set('loading', true);
    case OPEN_FORM:
      return state.set('fopen', true);
    case DISPLAY_ERROR:
      return state.set('errText', action.value);
    case CLOSE_FORM:
      return state
        .set('errText', '')
        .set('fopen', false);
    default:
      return state;
  }
}

export default welcomePageReducer;
