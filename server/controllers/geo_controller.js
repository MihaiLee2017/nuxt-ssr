import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import Province from '../dbs/models/province'
import Email from '../dbs/config'
import Passport from '../utils/passport'
import axiosUtils from '../utils/axios'
import axios from 'axios'
import ApiError from '../utils/error/ApiError'
import ApiErrorNames from '../utils/error/ApiErrorNames'
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
