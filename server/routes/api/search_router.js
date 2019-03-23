import koa_router from 'koa-router'
import * as search_controller from '../../controllers/search_controller'
let router = new koa_router()
router.prefix('/search')
router.get('/getTop', search_controller.getTop)
router.get('/getHotPlace', search_controller.getHotPlace)
router.get('/resultsByKeywords', search_controller.resultsByKeywords)
router.get('/getProducts', search_controller.getProducts)


export default router

