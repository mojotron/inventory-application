const express = require('express');
const {
  getCategoryItems,
  getAllItems,
  getItem,
  createItemGet,
  createItemPost,
  updateItemGet,
  updateItemPost,
  deleteItemGet,
  deleteItemPost,
} = require('../controllers/inventoryControllerOLD');

const getItemOptions = require('../middleware/getItemOptions');
const itemValidator = require('../validators/item');

const router = express.Router();

router.get('/:categoryName', getCategoryItems);
router.get('/:categoryName/:categoryItemName', getAllItems);
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
router.get('/:categoryName/:categoryItemName/:itemName', getItem);

router.get(
  '/:categoryName/:categoryItemName/:itemName/update',
  getItemOptions,
  updateItemGet,
);
router.post(
  '/:categoryName/:categoryItemName/:itemName/update',
  itemValidator,
  getItemOptions,
  updateItemPost,
);

router.get('/:categoryName/:categoryItemName/:itemName/delete', deleteItemGet);
router.post(
  '/:categoryName/:categoryItemName/:itemName/delete',
  deleteItemPost,
);

module.exports = router;
