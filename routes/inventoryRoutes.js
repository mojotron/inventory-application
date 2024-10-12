import { Router } from 'express';
import {
  getInventoryView,
  getCreateItem,
  postCreateItem,
} from '../controllers/inventoryController.js';

import { body } from 'express-validator';

const router = Router();

router.get('/', getInventoryView);
router.get('/:categoryName', getInventoryView);
router.get('/:categoryName/new', getCreateItem);
router.post(
  '/:categoryName/new',
  [
    body('itemName'),
    body('itemDescription'),
    body('itemQuantity'),
    body('itemPrice'),
  ],
  postCreateItem,
);
////////////////////////////////////////////

// categories

export default router;
