const router = require('express').Router()
const productController = require('../controllers/productControlller')


router.post('/', productController.createProduct )

module.exports = router

