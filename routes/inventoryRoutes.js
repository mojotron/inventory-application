const express = require('express');
const {
  getCategories,
  getCategoryItems,
  getAllItems,
  createItemGet,
  createItemPost,
  updateItem,
  deleteItem,
} = require('../controllers/inventoryController');

const getFormRarityAndAbilities = require('../middleware/getRarityAndAbilities');
const itemValidator = require('../validators/item');

const router = express.Router();

router.get('/', getCategories);
router.get('/:categoryName', getCategoryItems);
router.get('/:categoryName/:categoryItemName', getAllItems);
// TODO get single item
// createItem
router.get(
  '/:categoryName/:categoryItemName/create',
  getFormRarityAndAbilities,
  createItemGet,
);
router.post(
  '/:categoryName/:categoryItemName/create',
  itemValidator,
  getFormRarityAndAbilities,
  createItemPost,
);
//
router.patch('/:categoryName/:categoryItemName/:itemName', updateItem);
router.delete('/:categoryName/:categoryItemName/:itemName', deleteItem);

module.exports = router;
