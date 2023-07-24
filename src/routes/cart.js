const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart');
const { authenticate } = require('../middleware/authentication');
const {
  addItemToCartValidation,
  increaseQuantityValidation,
  decreaseQuantityValidation,
  deleteItemFromCartValidation,
} = require('../validations/cart');

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart endpoints
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/successfulRetrievalOfCart'
 *       '401':
 *         $ref: '#/components/responses/unauthorized'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.get('/cart', authenticate, cartController.getCart);

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddToCart'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/successfulAdditionToCart'
 *       '400':
 *         $ref: '#/components/responses/invalidRequest'
 *       '401':
 *         $ref: '#/components/responses/unauthorized'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.post('/cart', authenticate, addItemToCartValidation, cartController.addItemToCart);

/**
 * @swagger
 * /cart/empty:
 *   delete:
 *     summary: Empty cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/successfulEmptyingOfCart'
 *       '401':
 *         $ref: '#/components/responses/unauthorized'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.delete('/cart/empty', authenticate, cartController.emptyCart);

/**
 * @swagger
 * /cart/checkout:
 *   post:
 *     summary: Checkout all items in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/successfulCheckoutOfItems'
 *       '401':
 *         $ref: '#/components/responses/unauthorized'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.post('/cart/checkout', authenticate, cartController.checkoutAllItems);

/**
 * @swagger
 * /cart/increaseQuantity/{itemId}:
 *   put:
 *     summary: Increase quantity of an item in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/successfulIncreaseInItemQuantity'
 *       '400':
 *         $ref: '#/components/responses/invalidRequest'
 *       '401':
 *         $ref: '#/components/responses/unauthorized'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.put('/cart/increaseQuantity/:itemId', authenticate, increaseQuantityValidation, cartController.increaseQuantity);

/**
 * @swagger
 * /cart/decreaseQuantity/{itemId}:
 *   put:
 *     summary: Decrease quantity of an item in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/successfulDecreaseInItemQuantity'
 *       '400':
 *         $ref: '#/components/responses/invalidRequest'
 *       '401':
 *         $ref: '#/components/responses/unauthorized'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.put('/cart/decreaseQuantity/:itemId', authenticate, decreaseQuantityValidation, cartController.decreaseQuantity);

/**
 * @swagger
 * /cart/{itemId}:
 *   delete:
 *     summary: Delete an item from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/successfulDeletionOfItemFromCart'
 *       '400':
 *         $ref: '#/components/responses/invalidRequest'
 *       '401':
 *         $ref: '#/components/responses/unauthorized'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.delete('/cart/:itemId', authenticate, deleteItemFromCartValidation, cartController.deleteItemFromCart);

module.exports = router;
