import path from 'node:path'
import { Router } from 'express'
import multer from 'multer'
import { createCategory } from './app/useCases/Categories/createCategory'
import { listCategories } from './app/useCases/Categories/listCategories'
import { createProduct } from './app/useCases/Products/createProduct'
import { listProducts } from './app/useCases/Products/listProducts'
import { listProductsByCategory } from './app/useCases/Categories/listProductsByCategory'
import { listOrders } from './app/useCases/Orders/listOrders'
import { createOrder } from './app/useCases/Orders/createOrder'
import { changeOrderStatus } from './app/useCases/Orders/changeOrderStatus'
import { deleteOrder } from './app/useCases/Orders/deleteOrder'

export const router = Router()

const upload = multer({
    storage: multer.diskStorage({
        destination(rew, file, callback){
            callback(null, path.resolve(__dirname, '..', 'uploads'))
        },
        filename(req, file, callback){
            callback(null, `${Date.now()}-${file.originalname}`)
        }
    })
})

// Categories
router.get('/categories', listCategories)
router.post('/categories', createCategory)

//Products
router.get('/products', listProducts)
router.post('/products', upload.single('image'), createProduct)
router.get('/categories/:id/products', listProductsByCategory)

//Orders
router.get('/orders', listOrders)
router.post('/orders', createOrder)
router.patch('/orders/:id', changeOrderStatus)
router.delete('/orders/:id', deleteOrder)