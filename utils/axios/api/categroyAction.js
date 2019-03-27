import * as Action from '../base.js';
import * as URL from './url.js'

export function getCrumbs(params) {
  return Action.get(URL.getCrumbs, params)
}
