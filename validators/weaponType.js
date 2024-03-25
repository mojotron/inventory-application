const { body } = require('express-validator');

const validators = [
  body('weaponTypeName').trim().notEmpty().toLowerCase().escape(),
];

module.exports = validators;
