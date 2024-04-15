const express = require('express');
const {
  //getCategories,
  getCategoryItems,
  getAllItems,
  createItemGet,
  createItemPost,
  updateItem,
  deleteItem,
} = require('../controllers/inventoryController');

const getItemOptions = require('../middleware/getItemOptions');
const itemValidator = require('../validators/item');

const router = express.Router();

router.get('/:categoryName', getCategoryItems);
router.get('/:categoryName/:categoryItemName', getAllItems);
// TODO get single item
// createItem
router.get(
  '/:categoryName/:categoryItemName/create',
  getItemOptions,
  createItemGet,
);
router.post(
  '/:categoryName/:categoryItemName/create',
  itemValidator,
  getItemOptions,
  createItemPost,
);
//
router.patch('/:categoryName/:categoryItemName/:itemName', updateItem);
router.delete('/:categoryName/:categoryItemName/:itemName', deleteItem);

module.exports = router;
