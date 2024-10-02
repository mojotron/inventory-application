import { Router } from 'express';
import { getInventoryView } from '../controllers/inventoryController.js';
import {
  getCategoriesView,
  getCreateCategory,
} from '../controllers/categoriesController.js';

const router = Router();

router.get('/', getInventoryView);
// categories
router.get('/categories', getCategoriesView);
router.get('/categories/new', getCreateCategory);

export default router;
