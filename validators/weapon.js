const { body } = require('express-validator');

const validators = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('name field is required')
    .toLowerCase()
    .isAlphanumeric()
    .withMessage(
      'name contains invalid character, please use letters and numbers',
    )
    .isLength({ min: 3, max: 25 })
    .withMessage('name must be between 3 and 25 characters')
    .escape(),

  body('attackPower').trim().notEmpty().isFloat({ min: 1, max: 100 }).escape(),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('description field is required')
    .toLowerCase()
    .isLength({ min: 3, max: 150 })
    .withMessage('description must be between 3 and 150 characters')
    .escape(),
];

module.exports = validators;
