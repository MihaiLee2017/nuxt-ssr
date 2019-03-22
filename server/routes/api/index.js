import koa_router from 'koa-router'
import user_router from './user_router'
import geo_router from './geo_router'
import test_touter from './test_touter'
let router = new koa_router()
router.prefix('/api')
router.use(test_touter.routes(), test_touter.allowedMethods())
router.use(user_router.routes(), user_router.allowedMethods())
router.use(geo_router.routes(), geo_router.allowedMethods())
export default router
