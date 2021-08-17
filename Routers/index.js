import {express} from '../Config/import-config'
import {registerConroller, loginController, userController, refreshController, productController} from '../Controllers'
import adminHandler from '../Middlewares/admin_handler'
import authHandler from '../Middlewares/auth_handler'
const router = express.Router()


router.post('/register', registerConroller.register)

router.post('/login', loginController.login)

router.post('/refresh', refreshController.refresh)

router.get('/me', authHandler, userController.user)

router.post('/logout', authHandler, loginController.logout)



router.post('/products', [authHandler, adminHandler], productController.addProduct)

router.put('/products/:id', [authHandler, adminHandler], productController.updateProduct)

router.delete('/products/:id', [authHandler, adminHandler], productController.deleteProduct)

router.get('/products', productController.getAllProduct)

router.get('/products/:id', productController.getSingleProduct)





export default router