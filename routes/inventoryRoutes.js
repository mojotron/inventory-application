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
} = require('../controllers/inventoryController.js');

const weaponTypeValidator = require('../validators/weaponType.js');
const weaponValidator = require('../validators/weapon.js');

const router = express.Router();

router.get('/weapons', allWeaponTypes);
router.get('/weapons/create-type', createWeaponTypeGet);
router.post('/weapons/create-type', weaponTypeValidator, createWeaponTypePost);
router.get('/weapons/:weaponType', allWeapons);
router.get('/weapons/:weaponType/create', createWeaponGet);
router.post('/weapons/:weaponType/create', weaponValidator, createWeaponPost);
router.get('/weapons/:weaponType/:weaponName', getWeapon);
router.get('/weapons/:weaponType/:weaponName/delete', deleteWeaponGet);
router.post('/weapons/:weaponType/:weaponName/delete', deleteWeaponPost);

module.exports = router;
