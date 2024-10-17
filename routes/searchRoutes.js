import { Router } from 'express';
import { query } from 'express-validator';
import { getSearchResults } from '../controllers/searchController.js';

const router = Router();

router.get(
  '/',
  query('item')
    .trim()
    .notEmpty()
    .withMessage('Search query must not be empty')
    .isString()
    .withMessage('Search query must string')
    .escape(),
  getSearchResults,
);

export default router;
