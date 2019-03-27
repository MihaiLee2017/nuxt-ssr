import * as Action from '../base.js';
import * as URL from './url.js'
export function getProvince(params) {
  return Action.get(URL.GET_PROVINCE, params)
}

export function getProvinceID(id) {
  let url = URL.GET_PROVINCE + '/' + id
  return Action.get(url, {})
}
export function getCity(params) {
  return Action.get(URL.GET_CITY, params)
}
export function getHotCity(params) {
  return Action.get(URL.HOT_CITY, params)
}
