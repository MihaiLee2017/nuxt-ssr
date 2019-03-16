import * as Action from '../base.js';
import * as URL from './url.js'
export function testAction(url, params) {
  return Action.get(URL.TEST_URL, params)
}
