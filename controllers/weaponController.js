const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
// models
const Category = require('../models/category');
const Weapon = require('../models/weapon');
// constants
const itemQualityOptions = require('../constants/itemQuality');
const weaponSlotOptions = require('../constants/weaponSlot');
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
// CREATE WEAPON CATEGORY
const createWeaponCategoryGet = asyncHandler(async (req, res) => {
  const allWeaponCategories = await Category.find({
    category: 'weapon',
  }).select('name');

  const existingWepCategories = allWeaponCategories.map((item) => item.name);

  const newWeaponOptions = weaponSlotOptions.filter(
    (option) => !existingWepCategories.includes(option),
  );

  res.status(StatusCodes.OK).render('categoryForm', {
    categoryName: 'create new weapon category',
    categoryOptions: newWeaponOptions,
    errors: [],
  });
});

const createWeaponCategoryPost = asyncHandler(async (req, res) => {
  const { categoryName } = req.body;

  const weaponExist = await Category.findOne({ name: categoryName });

  if (weaponExist) {
    // in case multiple users creating same option
    const allWeaponCategories = await Category.find({
      category: 'weapon',
    }).select('name');

    const newWeaponOptions = weaponSlotOptions.filter(
      (option) => !allWeaponCategories.includes(option),
    );

    res.render('categoryForm', {
      categoryName: 'create new weapon category',
      categoryOptions: newWeaponOptions,
      errors: [{ msg: `${categoryName} already created` }],
    });
    return;
  }

  const newWeaponType = await Category.create({
    name: categoryName,
    category: 'weapon',
  });
  if (newWeaponType === null) throw new Error(); // error handler middleware will display default error
  res.status(StatusCodes.CREATED).redirect('/inventory/weapon');
});
// GET ALL WEAPONS (category instances)
const allWeapons = asyncHandler(async (req, res) => {
  const { weaponCategory } = req.params;
  const categoryDoc = await Category.findOne({
    name: weaponCategory,
    category: 'weapon',
  });
  if (categoryDoc === null) {
    throw new BadRequest(`Could not find ${weaponCategory} category`);
  }

  const allWeapons = await Weapon.find({ type: categoryDoc._id });

  res.render('categoryItems', {
    category: 'weapon',
    subCategory: categoryDoc.name,
    categoryItems: allWeapons,
  });
});
// GET SINGLE WEAPON
const getWeapon = asyncHandler(async (req, res) => {
  const { weaponCategory, weaponName } = req.params;
  const weaponDoc = await Weapon.findOne({ name: weaponName });
  if (weaponDoc === null) {
    throw new BadRequest(
      `Could not find ${weaponCategory} item with name ${weaponName}`,
    );
  }
  res.render('weaponDetails', { weapon: weaponDoc, weaponCategory });
});
// CREATE NEW WEAPON (category instance)
const createWeaponGet = (req, res) => {
  const { weaponCategory } = req.params;

  res.render('weaponCreateForm', {
    category: weaponCategory,
    itemQualityOptions,
    errors: [],
    formValues: {
      name: '',
      attackPower: 1,
      description: '',
      itemQuality: 'poor',
    },
    buttonDisplay: `Create ${weaponCategory}`,
  });
};

const createWeaponPost = asyncHandler(async (req, res) => {
  const { weaponCategory } = req.params;
  const { name, attackPower, description, itemQuality } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('weaponCreateForm', {
      category: weaponCategory,
      itemQualityOptions,
      errors: errors.errors,
      formValues: { name, attackPower, description, itemQuality },
      buttonDisplay: `Create ${weaponCategory}`,
    });
    return;
  }

  const weaponTypeDoc = await Category.findOne({
    name: weaponCategory,
    category: 'weapon',
  });

  if (weaponTypeDoc === null) {
    throw new BadRequest(`Could not find ${weaponCategory} weapon category`);
  }
  const newWeapon = await Weapon.create({
    name: name,
    type: weaponTypeDoc._id,
    attackPower: Number(attackPower),
    description,
    itemQuality,
  });
  if (newWeapon === null) throw new Error(); // error handler middleware will display default error
  res.redirect(`/inventory/weapon/${weaponCategory}`);
});
// DELETE WEAPON
const deleteWeaponGet = (req, res) => {
  const { weaponCategory, weaponName } = req.params;
  res.render('deleteItem', {
    category: 'weapon',
    subCategory: weaponCategory,
    itemName: weaponName,
  });
};

const deleteWeaponPost = asyncHandler(async (req, res) => {
  const { weaponCategory, weaponName } = req.params;
  const deletedWeapon = await Weapon.findOneAndDelete({ name: weaponName });

  if (deletedWeapon === null) {
    throw new BadRequest(
      `Could not find ${weaponCategory} item with name ${weaponName}`,
    );
  }
  // check if current weapon type has any weapon instance, if not delete weapon type
  const weaponTypeDoc = await Category.findOne({
    name: weaponCategory,
    category: 'weapon',
  });
  const allWeaponsWithType = await Weapon.find({ type: weaponTypeDoc._id });

  if (allWeaponsWithType.length === 0) {
    await Category.findByIdAndDelete(weaponTypeDoc._id);
    res.redirect(`/inventory/weapon/`);
    return;
  }
  res.redirect(`/inventory/weapon/${weaponCategory}`);
});
// UPDATE WEAPON
const updateWeaponGet = asyncHandler(async (req, res) => {
  const { weaponCategory, weaponName } = req.params;
  const weaponDoc = await Weapon.findOne({ name: weaponName });

  if (weaponDoc === null) {
    throw new BadRequest(
      `Could not find ${weaponCategory} item with name ${weaponName}`,
    );
  }

  res.render('weaponCreateForm', {
    category: weaponCategory,
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
  const { weaponCategory, weaponName } = req.params;
  const { name, attackPower, description, itemQuality } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.render('weaponCreateForm', {
      category: weaponCategory,
      itemQualityOptions,
      errors: errors.errors,
      formValues: { name, attackPower, description, itemQuality },
      buttonDisplay: `Create ${weaponCategory}`,
    });
    return;
  }

  const weaponDoc = await Weapon.findOne({ name: weaponName });

  if (weaponDoc === null) {
    throw new BadRequest(
      `Could not ${weaponCategory} item with name ${weaponName}`,
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
  res.redirect(`/inventory/weapon/${weaponCategory}/${updatedWeapon.name}`);
});

module.exports = {
  weaponCategories,
  createWeaponCategoryGet,
  createWeaponCategoryPost,
  allWeapons,
  getWeapon,
  createWeaponGet,
  createWeaponPost,
  deleteWeaponGet,
  deleteWeaponPost,
  updateWeaponGet,
  updateWeaponPost,
};
