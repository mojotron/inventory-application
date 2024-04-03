const express = require('express');
const {
  armorCategories,
  createArmorCategoryGet,
  createArmorCategoryPost,
  allArmor,
  createArmorGet,
  createArmorPost,
  getArmor,
  deleteArmorGet,
  deleteArmorPost,
  updateArmorGet,
  updateArmorPost,
} = require('../controllers/armorController');

const categoryValidator = require('../validators/category');
const armorValidator = require('../validators/armor');

const router = express.Router();

router.get('/', armorCategories);
router.get('/create', createArmorCategoryGet);
router.get('/create', createArmorCategoryGet);
router.post('/create', categoryValidator, createArmorCategoryPost);
router.get('/:armorCategory', allArmor);
router.get('/:armorCategory/create', createArmorGet);
router.post('/:armorCategory/create', armorValidator, createArmorPost);
router.get('/:armorCategory/:armorName', getArmor);
router.get('/:armorCategory/:armorName/delete', deleteArmorGet);
router.post('/:armorCategory/:armorName/delete', deleteArmorPost);
router.get('/:armorCategory/:armorName/update', updateArmorGet);
router.post(
  '/:armorCategory/:armorName/update',
  armorValidator,
  updateArmorPost,
);

module.exports = router;
