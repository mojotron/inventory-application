const express = require('express');
const {
  allWeaponTypes,
  createWeaponTypeGet,
  createWeaponTypePost,
} = require('../controllers/inventoryController.js');

const weaponTypeValidator = require('../validators/weaponType.js');

const router = express.Router();

router.get('/weapons', allWeaponTypes);
router.get('/weapons/create-type', createWeaponTypeGet);
router.post('/weapons/create-type', weaponTypeValidator, createWeaponTypePost);

module.exports = router;
