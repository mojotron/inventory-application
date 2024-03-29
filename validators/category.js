const { body } = require('express-validator');

const validators = [
  body('categoryName')
    .trim()
    .notEmpty()
    .matches(/[a-z]*/)
    .withMessage('Only letters are allowed for category name!')
    .toLowerCase()
    .isLength({ min: 3, max: 30 })
    .withMessage('Description must be between 3 and 30 characters')
    .escape(),
];

module.exports = validators;
