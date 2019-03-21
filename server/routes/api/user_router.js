import koa_router from 'koa-router'
import * as user_controller from '../../controllers/user_controller'
let router = new koa_router()
router.prefix('/user')
router.post('/signup', user_controller.signUp)
router.post('/signin', user_controller.signIn)
router.post('/verify', user_controller.verify)
router.get('/exit', user_controller.exit)
router.get('/getUser', user_controller.getUser)

export default router

