import { body } from 'express-validator';

const categoryValidator = body('categoryName')
  .trim()
  .isString()
  .withMessage('category name must be string')
  .notEmpty()
  .withMessage('category name must not be empty value')
  .isLength({ min: 3, max: 50 })
  .withMessage('category name must be between 3 and 50 characters long');

export default categoryValidator;
