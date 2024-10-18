import { query } from 'express-validator';

const searchValidator = query('item')
  .trim()
  .notEmpty()
  .withMessage('Search query must not be empty')
  .isString()
  .withMessage('Search query must string')
  .escape();

export default searchValidator;
