/*
 *
 * WelcomePage actions
 *
 */

import {
  DEFAULT_ACTION,
  SUBMIT_FORM,
  LOGOUT,
  LOGOUT_SUCCESS,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_FAILURE,
  OPEN_FORM,
  CLOSE_FORM,
  AUTH_CHECK,
  AUTH_SUCCESS,
  DISPLAY_ERROR,
} from './constants';
export function authCheck() {
  return {
    type: AUTH_CHECK,
  };
}

export function authSuccess(value) {
  return {
    type: AUTH_SUCCESS,
    value,
  };
}
export function displayError(value) {
  return {
    type: DISPLAY_ERROR,
    value,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function openform() {
  return {
    type: OPEN_FORM,
  };
}

export function closeform() {
  return {
    type: CLOSE_FORM,
  };
}
export function submit(value) {
  return {
    type: SUBMIT_FORM,
    value,
  };
}
export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}
export function submitSuccess(value) {
  return {
    type: SUBMIT_FORM_SUCCESS,
    value,
  };
}
export function submitFailure(value) {
  return {
    type: SUBMIT_FORM_FAILURE,
    value,
  };
}
export function logout() {
  return {
    type: LOGOUT,
  };
}
