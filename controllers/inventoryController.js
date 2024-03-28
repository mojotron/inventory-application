const WeaponType = require('../models/weaponType');
const Weapon = require('../models/weapon');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const itemQuality = require('../constants/itemQuality');

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
  const { weaponType } = req.params;
  const weaponTypeDoc = await WeaponType.findOne({ name: weaponType });
  console.log(weaponTypeDoc);
  const allWeapons = await Weapon.find({ type: weaponTypeDoc._id });
  res.render('weaponList', {
    weaponType: req.params.weaponType,
    weaponList: allWeapons,
  });
});
// GET SINGLE WEAPON
const getWeapon = asyncHandler(async (req, res) => {
  const { weaponType, weaponName } = req.params;
  const weaponDoc = await Weapon.findOne({ name: weaponName });
  res.render('weaponDetails', { weapon: weaponDoc, weaponType });
});

const createWeaponGet = (req, res) => {
  res.render('weaponCreateForm', {
    weaponType: req.params.weaponType,
    itemQuality,
    errors: [],
    formValues: {
      name: '',
      attackPower: 1,
      description: '',
      itemQuality: 'poor',
    },
  });
};
const createWeaponPost = asyncHandler(async (req, res) => {
  const { weaponType } = req.params;
  const { name, attackPower, description, itemQuality } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(name, attackPower, description, itemQuality);
    res.render('weaponCreateForm', {
      weaponType,
      itemQuality,
      errors: errors.errors,
      formValues: { name, attackPower, description, itemQuality },
    });
    return;
  }

  const weaponTypeDoc = await WeaponType.findOne({ name: weaponType });

  await Weapon.create({
    name: name,
    type: weaponTypeDoc._id,
    attackPower: Number(attackPower),
    description,
    itemQuality,
  });

  res.redirect(`/inventory/weapons/${weaponType}`);
});
// DELETE WEAPON
const deleteWeaponGet = (req, res) => {
  const { weaponType, weaponName } = req.params;
  res.render('weaponDelete', { weaponType, weaponName });
};

const deleteWeaponPost = asyncHandler(async (req, res) => {
  const { weaponType, weaponName } = req.params;
  res.redirect(`/inventory/weapons/${weaponType}`);
});

module.exports = {
  allWeaponTypes,
  createWeaponTypeGet,
  createWeaponTypePost,
  allWeapons,
  getWeapon,
  createWeaponGet,
  createWeaponPost,
  deleteWeaponGet,
  deleteWeaponPost,
};
