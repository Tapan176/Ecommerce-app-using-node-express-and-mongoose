const express = require('express')
const router = express.Router()
const cartController = require('../controller/cart')
const { authenticate } = require('../middleware/authentication')
const {
  addItemToCartValidation,
  increaseQuantityValidation,
  decreaseQuantityValidation,
  deleteItemFromCartValidation
} = require('../validations/cart')

router.get('/cart', authenticate, cartController.getCart)
router.post('/cart', authenticate, addItemToCartValidation, cartController.addItemToCart)
router.delete('/cart/empty', authenticate, cartController.emptyCart)
router.post('/cart/checkout', authenticate, cartController.checkoutAllItems)
router.put('/cart/increaseQuantity/:itemId', authenticate, increaseQuantityValidation, cartController.increaseQuantity)
router.put('/cart/decreaseQuantity/:itemId', authenticate, decreaseQuantityValidation, cartController.decreaseQuantity)
router.delete('/cart/delete/:itemId', authenticate, deleteItemFromCartValidation, cartController.deleteItemFromCart)

module.exports = router
