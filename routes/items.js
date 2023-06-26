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

router.get('/items', itemController.getAllItems);
router.post('/items', authenticate, multer.array('itemImages', 5), addItemValidation, itemController.addItem);
router.get('/items/myItems', authenticate, itemController.getUserItems);
router.get('/items/search', searchItemValidation, itemController.searchItem);
router.get('/items/filter', applyFiltersValidation, itemController.applyFilters);
router.get('/items/:itemId', itemController.getItemById);
router.put('/items/:itemId', authenticate, multer.array('itemImages', 5), updateItemValidation, itemController.updateItem);
router.delete('/items/:itemId', authenticate, deleteItemValidation, itemController.deleteItem);
router.get('/category/:categoryId/items', getItemsByCategoryValidation, itemController.getItemsByCategory);

module.exports = router;
