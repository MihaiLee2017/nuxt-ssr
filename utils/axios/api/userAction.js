import * as Action from '../base.js';
import * as URL from './url.js'
export function testAction(params) {
  return Action.get(URL.TEST_URL, params)
}
export function singUpAction(params) {
  return Action.post(URL.SIGNUP_URL, params)
}
export function singInAction(params) {
  return Action.post(URL.SIGNIN_URL, params)
}

export function verifyAction(params) {
  return Action.post(URL.VERIFY_URL, params)
}
export function exitAction(params) {
  return Action.get(URL.EXIT_URL, params)
}
export function getUserAction(params) {
  return Action.get(URL.GET_USER_URL, params)
}
