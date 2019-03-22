import koa_router from 'koa-router'
import * as geo_controller from '../../controllers/geo_controller'
let router = new koa_router()
router.prefix('/geo')
router.get('/getPosition', geo_controller.getPosition)
router.get('/getMenu', geo_controller.getMenu)
router.get('/getProvince', geo_controller.getProvince)

export default router

