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
import itemValidator from '../validators/itemValidator.js';

const router = Router();

router.get('/', getInventoryView);
router.get('/:categoryName', getInventoryView);
router.get('/:categoryName/new', getCreateItem);
router.post('/:categoryName/new', itemValidator, postCreateItem);
router.get('/:categoryName/:itemName', getInventoryItemDetails);
router.get('/:categoryName/:itemName/delete', getDeleteItem);
router.post('/:categoryName/:itemName/delete', postDeleteItem);
router.get('/:categoryName/:itemName/update', getUpdateItem);
router.post('/:categoryName/:itemName/update', itemValidator, postUpdateItem);

export default router;
