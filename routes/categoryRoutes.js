import { Router } from 'express';
import {
  getCategoriesView,
  getCreateCategory,
  postCreateCategory,
  getDeleteCategory,
  postDeleteCategory,
  getUpdateCategory,
  postUpdateCategory,
} from '../controllers/categoriesController.js';
import categoryValidator from '../validators/categoryValidator.js';

const router = Router();

router.get('', getCategoriesView);
router.get('/new', getCreateCategory);
router.post('/new', categoryValidator, postCreateCategory);
router.get('/:categoryName/delete', getDeleteCategory);
router.post('/:categoryName/delete', postDeleteCategory);
router.get('/:categoryName/update', getUpdateCategory);
router.post('/:categoryName/update', categoryValidator, postUpdateCategory);

export default router;
