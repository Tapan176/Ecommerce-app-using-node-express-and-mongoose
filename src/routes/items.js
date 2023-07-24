const express = require('express');

const router = express.Router();
const itemController = require('../controller/items');
const { authenticate } = require('../middleware/authentication');
const multer = require('../middleware/multer');
const {
  addItemValidation,
  updateItemValidation,
  deleteItemValidation,
  getItemsByCategoryValidation,
  searchItemValidation,
  applyFiltersValidation,
} = require('../validations/items');

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Item endpoints
 */

/**
 * @swagger
 * components:
 *   responses:
 *     BadRequest:
 *       $ref: '#/components/responses/badRequest'
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/successfulRetrievalOfAllItems'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.get('/items', itemController.getAllItems);

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Add an item
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/AddItem'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/successfulRetrievalOfAllItems'       
 *       '400':
 *         $ref: '#/components/responses/badRequest'
 *       '401':
 *         $ref: '#/components/responses/unauthorized'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.post('/items', authenticate, multer.array('itemImages', 5), addItemValidation, itemController.addItem);

/**
 * @swagger
 * /items/myItems:
 *   get:
 *     summary: Get user items
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/successfulRetrievalOfUserItems'
 *       '401':
 *         $ref: '#/components/responses/unauthorized'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.get('/items/myItems', authenticate, itemController.getUserItems);

/**
 * @swagger
 * /items/search:
 *   get:
 *     summary: Search item
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/successfulRetrievalOfSearchResults'
 *       '400':
 *         $ref: '#/components/responses/badRequest'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.get('/items/search', searchItemValidation, itemController.searchItem);

/**
 * @swagger
 * /items/filter:
 *   get:
 *     summary: Apply filters to items
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         required: false
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         required: false
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/successfulRetrievalOfFilteredItems'
 *       '400':
 *         $ref: '#/components/responses/badRequest'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.get('/items/filter', applyFiltersValidation, itemController.applyFilters);

/**
 * @swagger
 * /items/{itemId}:
 *   get:
 *     summary: Get an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/successfulRetrievalOfItem'   
 *       '404':
 *         $ref: '#/components/responses/itemNotFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.get('/items/:itemId', itemController.getItemById);

/**
 * @swagger
 * /items/{itemId}:
 *   put:
 *     summary: Update an item
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/successfulUpdateOfItem' 
 *       '400':
 *         $ref: '#/components/responses/badRequest'
 *       '401':
 *         $ref: '#/components/responses/unauthorized'
 *       '404':
 *         $ref: '#/components/responses/itemNotFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.put('/items/:itemId', authenticate, multer.array('itemImages', 5), updateItemValidation, itemController.updateItem);

/**
 * @swagger
 * /items/{itemId}:
 *   delete:
 *     summary: Delete an item
 *     tags: [Items]
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
 *         $ref: '#/components/responses/successfulDeletionOfItem'
 *       '400':
 *         $ref: '#/components/responses/badRequest'
 *       '401':
 *         $ref: '#/components/responses/unauthorized'
 *       '404':
 *         $ref: '#/components/responses/itemNotFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.delete('/items/:itemId', authenticate, deleteItemValidation, itemController.deleteItem);

/**
 * @swagger
 * /category/{categoryId}/items:
 *   get:
 *     summary: Get items by category
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/successfulRetrievalOfItemsByCategory'
 *       '404':
 *         $ref: '#/components/responses/itemNotFound'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.get('/category/:categoryId/items', getItemsByCategoryValidation, itemController.getItemsByCategory);

module.exports = router;
