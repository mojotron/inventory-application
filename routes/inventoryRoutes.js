const express = require('express');
const {
  getCategories,
  getCategoryItems,
} = require('../controllers/inventoryController');

const router = express.Router();

router.get('/', getCategories);
router.get('/:categoryName', getCategoryItems);

module.exports = router;
