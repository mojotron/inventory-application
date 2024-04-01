const { body } = require('express-validator');

const validators = [body('name'), body('description'), body('armorPower')];

module.require = validators;
