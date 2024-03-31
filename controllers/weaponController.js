const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
// models
const Category = require('../models/category');
const Weapon = require('../models/weapon');
// constants
const itemQualityOptions = require('../constants/itemQuality');
// errors
const { BadRequest } = require('../errors/index');

// GET ALL WEAPON CATEGORIES
const weaponCategories = asyncHandler(async (req, res) => {
  const weaponCategories = await Category.find({ category: 'weapon' }).sort({
    name: 1,
  });

  res.render('categoryList', {
    category: 'weapon',
    categoryList: weaponCategories,
  });
});
// CREATE WEAPON TYPE (create category)
const createWeaponTypeGet = (req, res) => {
  res.status(StatusCodes.OK).render('categoryForm', {
    categoryName: 'create new weapon category',
    inputPlaceholder: 'sword, axe, eg.',
    inputValue: '',
    errors: [],
  });
};

const createWeaponTypePost = asyncHandler(async (req, res) => {
  const { categoryName } = req.body;
  const errors = validationResult(req);
  const weaponExist = await WeaponType.findOne({ name: categoryName });

  if (!errors.isEmpty() || weaponExist) {
    res.render('categoryForm', {
      categoryName: 'create new weapon category',
      inputPlaceholder: 'sword, axe, eg.',
      inputValue: categoryName,
      errors: weaponExist
        ? [{ msg: `${categoryName} already exists!` }]
        : errors.errors,
    });
    return;
  }

  const newWeaponType = await WeaponType.create({ name: categoryName });
  if (newWeaponType === null) throw new Error(); // error handler middleware will display default error
  res.status(StatusCodes.CREATED).redirect('/inventory/weapons');
});
// GET ALL WEAPONS (category instances)
const allWeapons = asyncHandler(async (req, res) => {
  const { weaponType } = req.params;
  const weaponTypeDoc = await WeaponType.findOne({ name: weaponType });
  if (weaponTypeDoc === null) {
    throw new BadRequest(`Could not find ${weaponType} category`);
  }
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
  if (weaponDoc === null) {
    throw new BadRequest(
      `Could not find ${weaponType} item with name ${weaponName}`,
    );
  }
  res.render('weaponDetails', { weapon: weaponDoc, weaponType });
});
// CREATE NEW WEAPON (category instance)
const createWeaponGet = (req, res) => {
  const { weaponType } = req.params;

  res.render('weaponCreateForm', {
    weaponType: weaponType,
    itemQualityOptions,
    errors: [],
    formValues: {
      name: '',
      attackPower: 1,
      description: '',
      itemQuality: 'poor',
    },
    buttonDisplay: `Create ${weaponType}`,
  });
};

const createWeaponPost = asyncHandler(async (req, res) => {
  const { weaponType } = req.params;
  const { name, attackPower, description, itemQuality } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('weaponCreateForm', {
      weaponType,
      itemQualityOptions,
      errors: errors.errors,
      formValues: { name, attackPower, description, itemQuality },
      buttonDisplay: `Create ${weaponType}`,
    });
    return;
  }

  const weaponTypeDoc = await WeaponType.findOne({ name: weaponType });

  if (weaponTypeDoc === null) {
    throw new BadRequest(`Could not find ${weaponType} weapon category`);
  }
  const newWeapon = await Weapon.create({
    name: name,
    type: weaponTypeDoc._id,
    attackPower: Number(attackPower),
    description,
    itemQuality,
  });
  if (newWeapon === null) throw new Error(); // error handler middleware will display default error
  res.redirect(`/inventory/weapons/${weaponType}`);
});
// DELETE WEAPON
const deleteWeaponGet = (req, res) => {
  const { weaponType, weaponName } = req.params;
  res.render('weaponDelete', { weaponType, weaponName });
};

const deleteWeaponPost = asyncHandler(async (req, res) => {
  const { weaponType, weaponName } = req.params;
  const deletedWeapon = await Weapon.findOneAndDelete({ name: weaponName });
  if (deletedWeapon === null) {
    throw new BadRequest(
      `Could not find ${weaponType} item with name ${weaponName}`,
    );
  }
  // check if current weapon type has any weapon instance, if not delete weapon type
  const weaponTypeDoc = await WeaponType.findOne({ name: weaponType });
  const allWeaponsWithType = await Weapon.find({ type: weaponTypeDoc._id });

  if (allWeaponsWithType.length === 0) {
    await WeaponType.findByIdAndDelete(weaponTypeDoc._id);
    res.redirect(`/inventory/weapons/`);
    return;
  }
  res.redirect(`/inventory/weapons/${weaponType}`);
});
// UPDATE WEAPON
const updateWeaponGet = asyncHandler(async (req, res) => {
  const { weaponType, weaponName } = req.params;
  const weaponDoc = await Weapon.findOne({ name: weaponName });
  if (weaponDoc === null) {
    throw new BadRequest(
      `Could not find ${weaponType} item with name ${weaponName}`,
    );
  }

  res.render('weaponCreateForm', {
    weaponType: weaponType,
    itemQualityOptions,
    errors: [],
    formValues: {
      name: weaponDoc.name,
      attackPower: weaponDoc.attackPower,
      description: weaponDoc.description,
      itemQuality: weaponDoc.itemQuality,
    },
    buttonDisplay: `update ${weaponName}`,
  });
});

const updateWeaponPost = asyncHandler(async (req, res) => {
  const { weaponType, weaponName } = req.params;
  const { name, attackPower, description, itemQuality } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.render('weaponCreateForm', {
      weaponType,
      itemQualityOptions,
      errors: errors.errors,
      formValues: { name, attackPower, description, itemQuality },
      buttonDisplay: `Create ${weaponType}`,
    });
    return;
  }

  const weaponDoc = await Weapon.findOne({ name: weaponName });

  if (weaponDoc === null) {
    throw new BadRequest(
      `Could not ${weaponType} item with name ${weaponName}`,
    );
  }

  const updatedWeapon = await Weapon.findOneAndUpdate(
    { name: weaponName },
    {
      _id: weaponDoc._id,
      name: name,
      type: weaponDoc.type,
      attackPower: Number(attackPower),
      description,
      itemQuality,
    },
  );
  if (updatedWeapon === null) throw new Error(); // error handler middleware will display default error
  res.redirect(`/inventory/weapons/${weaponType}/`);
});

module.exports = {
  weaponCategories,
  createWeaponTypeGet,
  createWeaponTypePost,
  allWeapons,
  getWeapon,
  createWeaponGet,
  createWeaponPost,
  deleteWeaponGet,
  deleteWeaponPost,
  updateWeaponGet,
  updateWeaponPost,
};
