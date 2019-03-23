import Redis from 'koa-redis'
import Poi from '../dbs/models/poi'
import axios from '../utils/axios'
// import axios from 'axios'
let Store = new Redis().client
const sign = 'b601f4f004b8e6b2b82741335d4f04d1'
const baseUrl = `http://cp-tools.cn/search/<url>?sign=${sign}`
function getUrl(str) {
  return baseUrl.replace('<url>', str)
}
export async function getTop(ctx, next) {
  let params = {
    input: ctx.query.input,
    city: ctx.query.city
  }
  await axios.get(getUrl('top'), { params }).then(res => {
    let { status, data: {
      top
    } } = res
    ctx.body = {
      data: { top }
    }
  }).catch(err => {
    throw err
  })
}

export async function getHotPlace(ctx) {
  // let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  // try {
  //   let result = await Poi.find({
  //     city,
  //     type: ctx.query.type || '景点'
  //   }).limit(10)
  //   ctx.body = {
  //     data: {
  //       hotPlace: result.map(item => {
  //         return {
  //           name: item.name,
  //           type: item.type
  //         }
  //       })
  //     }
  //   }
  // } catch (err) {
  //   throw err
  // }
  let city = ctx.store
    ? ctx.store.geo.position.city
    : ctx.query.city
  await axios.get(getUrl("hotPlace"), {
    params: {
      city
    }
  }).then(res => {
    let { status, data: {
      result
    } } = res
    ctx.body = {
      data: {
        result
      }
    }
  }).catch(err => {
    throw err
  })



}
export async function resultsByKeywords(ctx) {
  const { city, keyword } = ctx.query
  //
  await axios.get(getUrl('resultsByKeywords'), {
    params: {
      city, keyword
    }
  }).then(res => {
    let { status, data: { count, pois } } = res
    ctx.body = {
      data: pois
    }
  }).catch(err => {
    throw err
  })
}
export async function getProducts(ctx) {
  let keyword = ctx.query.keyword || '旅游'
  let city = ctx.query.keyword || '北京'
  await axios.get(getUrl('products'), {
    params: {
      keyword,
      city
    }
  }).then(res => {
    let {
      status,
      data: {
        product,
        more
      }
    } = res
    ctx.body = {
      data: {
        product,
        more: ctx.isAuthenticated() ? more : [],
        login: ctx.isAuthenticated()
      }
    }
  }).catch(err => {
    throw err
  })
}
