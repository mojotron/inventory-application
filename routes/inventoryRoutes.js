import { Router } from 'express';
import {
  getInventoryView,
  getCreateItem,
  postCreateItem,
} from '../controllers/inventoryController.js';
import {
  getCategoriesView,
  getCreateCategory,
  postCreateCategory,
  getDeleteCategory,
  postDeleteCategory,
  getUpdateCategory,
  postUpdateCategory,
} from '../controllers/categoriesController.js';
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
router.get('/categories', getCategoriesView);

router.get('/categories/:categoryName/delete', getDeleteCategory);
router.post('/categories/:categoryName/delete', postDeleteCategory);

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

router.get('/categories/:categoryName/update', getUpdateCategory);
router.post(
  '/categories/:categoryName/update',
  body('categoryName')
    .trim()
    .isString()
    .withMessage('category name must be string')
    .notEmpty()
    .withMessage('category name must not be empty value')
    .isLength({ min: 3, max: 50 })
    .withMessage('category name must be between 3 and 50 characters long'),
  postUpdateCategory,
);

export default router;
