const express = require('express');
const {
  getCategories,
  getCategoryItems,
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/inventoryController');

const router = express.Router();

router.get('/', getCategories);
router.get('/:categoryName', getCategoryItems);
router.get('/:categoryName/:categoryItemName', getAllItems);
// TODO get single item
router.post('/:categoryName/:categoryItemName', createItem);
router.patch('/:categoryName/:categoryItemName/:itemName', updateItem);
router.delete('/:categoryName/:categoryItemName/:itemName', deleteItem);

module.exports = router;
