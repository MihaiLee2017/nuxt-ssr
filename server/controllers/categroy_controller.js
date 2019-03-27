import Redis from 'koa-redis'
import Poi from '../dbs/models/poi'
import axios from '../utils/axios'
// import axios from 'axios'
let Store = new Redis().client
const sign = 'b601f4f004b8e6b2b82741335d4f04d1'
const baseUrl = `http://cp-tools.cn/categroy/<url>?sign=${sign}`
function getUrl(str) {
  return baseUrl.replace('<url>', str)
}
export async function getCrumbs(ctx, next) {
  let params = {
    city: ctx.query.city ? ctx.query.city.replace("市", '') : "北京"
  }
  await axios.get(getUrl('crumbs'), { params }).then(res => {
    let { status, data: {
      areas,
      types
    } } = res
    ctx.body = {
      data: {
        areas,
        types
      }
    }
  }).catch(err => {
    throw err
  })
}
