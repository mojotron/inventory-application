const express = require('express');
const {
  armorCategories,
  createArmorCategoryGet,
  createArmorCategoryPost,
  allArmor,
  createArmorGet,
  createArmorPost,
  getArmor,
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
// router.get('/:weaponCategory/:weaponName/delete', deleteWeaponGet);
// router.post('/:weaponCategory/:weaponName/delete', deleteWeaponPost);
// router.get('/:weaponCategory/:weaponName/update', updateWeaponGet);

module.exports = router;
