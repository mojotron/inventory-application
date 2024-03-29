const express = require('express');
const {
  allWeaponTypes,
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
} = require('../controllers/inventoryController.js');

const categoryValidator = require('../validators/category.js');
const weaponValidator = require('../validators/weapon.js');

const router = express.Router();

router.get('/weapons', allWeaponTypes);
router.get('/weapons/create', createWeaponTypeGet);
router.post('/weapons/create', categoryValidator, createWeaponTypePost);
router.get('/weapons/:weaponType', allWeapons);
router.get('/weapons/:weaponType/create', createWeaponGet);
router.post('/weapons/:weaponType/create', weaponValidator, createWeaponPost);
router.get('/weapons/:weaponType/:weaponName', getWeapon);
router.get('/weapons/:weaponType/:weaponName/delete', deleteWeaponGet);
router.post('/weapons/:weaponType/:weaponName/delete', deleteWeaponPost);
router.get('/weapons/:weaponType/:weaponName/update', updateWeaponGet);
router.post(
  '/weapons/:weaponType/:weaponName/update',
  weaponValidator,
  updateWeaponPost,
);

module.exports = router;
