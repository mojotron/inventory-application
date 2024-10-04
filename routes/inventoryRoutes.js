import { Router } from 'express';
import { getInventoryView } from '../controllers/inventoryController.js';
import {
  getCategoriesView,
  getCreateCategory,
  postCreateCategory,
} from '../controllers/categoriesController.js';
import { body } from 'express-validator';

const router = Router();

router.get('/', getInventoryView);
// categories
router.get('/categories', getCategoriesView);
router.get('/categories/new', getCreateCategory);
router.post(
  '/categories/new',
  body('categoryName')
    .trim()
    .isString()
    .withMessage('category name must be string')
    .notEmpty()
    .withMessage('category name must not be empty value')
    .isLength({ min: 3, max: 50 })
    .withMessage('category name must be between 3 and 50 characters long'),
  postCreateCategory,
);

export default router;
