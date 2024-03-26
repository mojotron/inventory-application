const WeaponType = require('../models/weaponType');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');

const allWeaponTypes = asyncHandler(async (req, res) => {
  const allWeaponTypes = await WeaponType.find({}).sort({ name: 1 });
  res.render('weaponTypeList', { weaponTypeList: allWeaponTypes });
});

const createWeaponTypeGet = (req, res) => {
  res.render('weaponTypeForm', { errors: [] });
};

const createWeaponTypePost = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    res.render('weaponTypeForm', {
      errors: errors.errors,
    });
    return;
  }
  const { weaponTypeName } = req.body;
  const weaponExist = await WeaponType.findOne({ name: weaponTypeName });

  if (weaponExist) {
    res.render('weaponTypeForm', {
      errors: [{ msg: `${weaponTypeName} already exists!` }],
    });
    return;
  }
  await WeaponType.create({ name: weaponTypeName });
  res.redirect('/inventory/weapons');
});

const allWeapons = asyncHandler(async (req, res) => {
  res.render('weaponList', { weaponType: req.params.weaponType });
});

const createWeaponGet = (req, res) => {
  res.render('weaponCreateForm', {
    weaponType: req.params.weaponType,
    errors: [],
  });
};
const createWeaponPost = () => {};

module.exports = {
  allWeaponTypes,
  createWeaponTypeGet,
  createWeaponTypePost,
  allWeapons,
  createWeaponGet,
  createWeaponPost,
};
