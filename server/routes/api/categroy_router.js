import koa_router from 'koa-router'
import * as categroy_controller from '../../controllers/categroy_controller'
let router = new koa_router()
router.prefix('/categroy')
router.get('/getCrumbs', categroy_controller.getCrumbs)


export default router

