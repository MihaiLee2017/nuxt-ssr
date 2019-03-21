import koa_router from 'koa-router'
import ApiError from '../../utils/error/ApiError'
import ApiErrorNames from '../../utils/error/ApiErrorNames'
let router = new koa_router()
router.prefix('/test')

router.get('/error', (ctx, next) => {
  // throw { code: 1, message: 2 }
  throw new ApiError(ApiErrorNames.UNKNOW_ERROR.name)
  // throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
})

router.get('/format', (ctx, next) => {
  ctx.body = {
    data: 'test format'
  }
})
export default router
