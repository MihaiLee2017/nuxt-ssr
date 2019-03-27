import * as Action from '../base.js';
import * as URL from './url.js'
export function getTopAction(params) {
  return Action.get(URL.SEARCH_TOP, params)
}

export function getResultsByKeywords(params) {
  return Action.get(URL.RESULTS_BY_KEYWORDS, params)
}
