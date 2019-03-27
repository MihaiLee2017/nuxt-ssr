import Redis from 'koa-redis'
import Province from '../dbs/models/province'
import City from '../dbs/models/city'
import axios from 'axios'
let Store = new Redis().client

const sign = 'b601f4f004b8e6b2b82741335d4f04d1'
const baseUrl = `http://cp-tools.cn/geo/<url>?sign=${sign}`
function getUrl(str) {
  return baseUrl.replace('<url>', str)
}
export async function getPosition(ctx, next) {
  let res = await axios.get(getUrl("getPosition"))
  let { status, data } = res
  if (status == 200) {
    ctx.body = {
      data
    }
  } else {
    ctx.body = {}
  }
}

export async function getMenu(ctx, next) {
  let res = await axios.get(getUrl("menu"))
  let { status, data } = res
  if (status == 200) {
    ctx.body = {
      data: data
    }
  } else {
    ctx.body = {
    }
  }
}
// export async function getMenu(ctx, next) {
//   try {
//     let menu = await Menu.find()
//     ctx.body = {
//       data: {
//         menu: menu
//       }
//     }
//   } catch (err) {
//     throw err
//   }
// }

export async function getProvince(ctx, next) {
  try {
    let province = await Province.find()
    ctx.body = {
      data: {
        province: province.map(item => {
          return {
            id: item.id,
            value: item.value[0]
          }
        })
      }
    }
  } catch (err) {
    throw err
  }
}

export async function getProvinceID(ctx, next) {
  let params = {
    id: ctx.params.id
  }
  console.log("getProvinceID:", ctx.params)
  try {
    let city = await City.findOne(params)
    ctx.body = {
      data: {
        city: city.value
      }
    }
  } catch (err) {
    throw err
  }
}

export async function getCity(ctx, next) {
  try {
    let city = []
    let ret = await City.find()
    ret.forEach(item => {
      city = city.concat(item.value)
    })
    ctx.body = {
      data: {
        city: city.map((item) => {
          return {
            province: item.province,
            id: item.id,
            name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
              ? item.province
              : item.name
          }
        })
      }
    }
  } catch (err) {
    throw (err)
  }
}
export async function hotCity(ctx, next) {
  // let { status, data: {
  //   hots
  // } } = await axios.get(getUrl('hotCity'));
  // if (status === 200) {
  //   ctx.body = {
  //     hots
  //   }
  // } else {
  //   ctx.body = {
  //     hots: []
  //   }
  // }
  await axios.get(getUrl('hotCity')).then(res => {
    let {
      status,
      data
    } = res
    ctx.body = {
      data: {
        hots: data.hots
      }
    }
  }).catch(err => {
    throw err
  })
}

