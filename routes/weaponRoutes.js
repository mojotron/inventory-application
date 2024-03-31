const express = require('express');
const {
  weaponCategories,
  createWeaponCategoryGet,
  createWeaponCategoryPost,
  allWeapons,
  createWeaponGet,
  createWeaponPost,
  getWeapon,
  deleteWeaponGet,
  deleteWeaponPost,
  updateWeaponGet,
  updateWeaponPost,
} = require('../controllers/weaponController.js');

const categoryValidator = require('../validators/category.js');
const weaponValidator = require('../validators/weapon.js');

const router = express.Router();

router.get('/', weaponCategories);
router.get('/create', createWeaponCategoryGet);
router.post('/create', categoryValidator, createWeaponCategoryPost);
router.get('/:weaponCategory', allWeapons);
router.get('/:weaponCategory/create', createWeaponGet);
router.post('/:weaponCategory/create', weaponValidator, createWeaponPost);
router.get('/:weaponCategory/:weaponName', getWeapon);
router.get('/:weaponCategory/:weaponName/delete', deleteWeaponGet);
router.post('/:weaponCategory/:weaponName/delete', deleteWeaponPost);
router.get('/:weaponCategory/:weaponName/update', updateWeaponGet);
router.post(
  '/:weaponType/:weaponName/update',
  weaponValidator,
  updateWeaponPost,
);

module.exports = router;
