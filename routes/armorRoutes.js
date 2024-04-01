const express = require('express');
const {
  armorCategories,
  createArmorCategoryGet,
} = require('../controllers/armorController');

const categoryValidator = require('../validators/category');
const armorValidator = require('../validators/armor');

const router = express.Router();

router.get('/', armorCategories);
router.get('/create', createArmorCategoryGet);

module.exports = router;
