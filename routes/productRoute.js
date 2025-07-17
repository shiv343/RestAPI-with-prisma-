const router = require('express').Router()
const productController = require('../controllers/productControlller')


router.post('/', productController.createProduct )
router.get('/' , productController.getProducts)

module.exports = router

