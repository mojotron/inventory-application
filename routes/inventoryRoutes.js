import { Router } from 'express';
import {
  getInventoryView,
  getCreateItem,
  postCreateItem,
  getInventoryItemDetails,
  getDeleteItem,
  postDeleteItem,
  getUpdateItem,
  postUpdateItem,
} from '../controllers/inventoryController.js';

import { body } from 'express-validator';

const router = Router();

router.get('/', getInventoryView);
router.get('/:categoryName', getInventoryView);
router.get('/:categoryName/new', getCreateItem);
router.post(
  '/:categoryName/new',
  [
    body('itemName')
      .trim()
      .notEmpty()
      .isString()
      .isLength({ min: 0, max: 50 })
      .withMessage('Item Name must be string with maximum of 50 characters'),
    body('itemDescription')
      .trim()
      .notEmpty()
      .isString()
      .isLength({ min: 0, max: 250 })
      .withMessage(
        'Item Description must be string with maximum of 250 characters',
      ),
    body('itemQuantity')
      .trim()
      .toInt()
      .isInt({ min: 1 })
      .withMessage('Item Quantity must be integer with minimum value of 1'),
    body('itemPrice')
      .trim()
      .toFloat()
      .isFloat({ min: 0 })
      .withMessage('Item Price must be a positive float number'),
  ],
  postCreateItem,
);
router.get('/:categoryName/:itemName', getInventoryItemDetails);
router.get('/:categoryName/:itemName/delete', getDeleteItem);
router.post('/:categoryName/:itemName/delete', postDeleteItem);
router.get('/:categoryName/:itemName/update', getUpdateItem);
router.post(
  '/:categoryName/:itemName/update',
  [
    body('itemName')
      .trim()
      .notEmpty()
      .isString()
      .isLength({ min: 1, max: 50 })
      .withMessage('Item Name must be string with maximum of 50 characters'),
    body('itemDescription')
      .trim()
      .notEmpty()
      .isString()
      .isLength({ min: 0, max: 250 })
      .withMessage(
        'Item Description must be string with maximum of 250 characters',
      ),
    body('itemQuantity')
      .trim()
      .toInt()
      .isInt({ min: 1 })
      .withMessage('Item Quantity must be integer with minimum value of 1'),
    body('itemPrice')
      .trim()
      .toFloat()
      .isFloat({ min: 0 })
      .withMessage('Item Price must be a positive float number'),
  ],
  postUpdateItem,
);

export default router;
