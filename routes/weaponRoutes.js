const express = require('express');
const {
  weaponCategories,
  createWeaponTypeGet,
  createWeaponTypePost,
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
router.get('/create', createWeaponTypeGet);
router.post('/create', categoryValidator, createWeaponTypePost);
router.get('/:weaponType', allWeapons);
router.get('/:weaponType/create', createWeaponGet);
router.post('/:weaponType/create', weaponValidator, createWeaponPost);
router.get('/:weaponType/:weaponName', getWeapon);
router.get('/:weaponType/:weaponName/delete', deleteWeaponGet);
router.post('/:weaponType/:weaponName/delete', deleteWeaponPost);
router.get('/:weaponType/:weaponName/update', updateWeaponGet);
router.post(
  '/:weaponType/:weaponName/update',
  weaponValidator,
  updateWeaponPost,
);

module.exports = router;
