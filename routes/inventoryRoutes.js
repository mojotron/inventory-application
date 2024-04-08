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

const router = express.Router();

router.get('/', getCategories);
router.get('/:categoryName', getCategoryItems);
router.get('/:categoryName/:categoryItemName', getAllItems);
// TODO get single item
// createItem
router.get('/:categoryName/:categoryItemName/create', createItemGet);
router.post('/:categoryName/:categoryItemName/create', createItemPost);
//
router.patch('/:categoryName/:categoryItemName/:itemName', updateItem);
router.delete('/:categoryName/:categoryItemName/:itemName', deleteItem);

module.exports = router;
