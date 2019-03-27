
import { TestRegExp } from '../../utils/fn'
import ApiError from '../../utils/error/ApiError'
function response_formatter(ctx) {
  if (ctx.body) {
    ctx.body = {
      code: ctx.body.code || 0,
      message: ctx.body.message || "success",
      data: ctx.body.data || {}
    }
  } else {
    ctx.body = {
      message: "success",
      code: 0
    }
  }

}
function url_filter(pattern) {
  return async function (ctx, next) {
    let isReg = TestRegExp(pattern, ctx.originalUrl)
    try {
      await next()
      if (isReg) {
        response_formatter(ctx)
      }
    } catch (error) {
      if (isReg) {
        ctx.status = 200
        ctx.body = {
          code: error.code,
          message: error.message
        }
      }
      throw error
      // console.log("error:", error)
      // if (error instanceof ApiError && isReg) {
      //   ctx.status = 200
      //   ctx.body = {
      //     code: error.code,
      //     message: error.message
      //   }
      // }
    }
  }
}
export default url_filter
