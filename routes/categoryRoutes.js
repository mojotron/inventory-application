import { Router } from 'express';
import { body } from 'express-validator';
import {
  getCategoriesView,
  getCreateCategory,
  postCreateCategory,
  getDeleteCategory,
  postDeleteCategory,
  getUpdateCategory,
  postUpdateCategory,
} from '../controllers/categoriesController.js';

const router = Router();

router.get('', getCategoriesView);
router.get('/new', getCreateCategory);
router.post(
  '/new',
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
router.get('/:categoryName/delete', getDeleteCategory);
router.post('/:categoryName/delete', postDeleteCategory);
router.get('/:categoryName/update', getUpdateCategory);
router.post(
  '/:categoryName/update',
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
