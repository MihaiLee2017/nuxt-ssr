import koa_router from 'koa-router'
import * as geo_controller from '../../controllers/geo_controller'
let router = new koa_router()
router.prefix('/geo')
router.get('/getPosition', geo_controller.getPosition)
router.get('/getMenu', geo_controller.getMenu)
router.get('/getProvince', geo_controller.getProvince)
router.get('/getProvince/:id', geo_controller.getProvinceID)
router.get('/getCity', geo_controller.getCity)
router.get('/hotCity', geo_controller.hotCity)
// router.get('/getMenu', geo_controller.getMenu)


export default router

