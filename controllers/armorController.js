const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
// models
const Category = require('../models/category');
const Armor = require('../models/armor');
// constants
const itemQualityOptions = require('../constants/itemQuality');
const armorSlotOptions = require('../constants/armorSlot');
// errors
const { BadRequest } = require('../errors/index');

// GAT ALL ARMOR CATEGORIES
const armorCategories = asyncHandler(async (req, res) => {
  const armorCategories = await Category.find({ category: 'armor' }).sort({
    name: 1,
  });

  res.render('categoryList', {
    category: 'armor',
    categoryList: armorCategories,
  });
});
// CREATE ARMOR CATEGORY
const createArmorCategoryGet = asyncHandler(async (req, res) => {
  const allArmorCategories = await Category.find({
    category: 'armor',
  }).select('name');

  const existingArmorCategories = allArmorCategories.map((item) => item.name);

  const newArmorOptions = armorSlotOptions.filter(
    (option) => !existingArmorCategories.includes(option),
  );

  res.status(StatusCodes.OK).render('categoryForm', {
    categoryName: 'create new weapon category',
    categoryOptions: newArmorOptions,
    errors: [],
  });
});

const createArmorCategoryPost = asyncHandler(async (req, res) => {
  const { categoryName } = req.body;

  const armorExists = await Category.findOne({ name: categoryName });

  if (armorExists) {
    const allArmorCategories = await Category.find({
      category: 'armor',
    }).select('name');

    const existingArmorCategories = allArmorCategories.map((item) => item.name);

    const newArmorOptions = armorSlotOptions.filter(
      (option) => !existingArmorCategories.includes(option),
    );

    res.status(StatusCodes.OK).render('categoryForm', {
      categoryName: 'create new weapon category',
      categoryOptions: newArmorOptions,
      errors: [],
    });
    return;
  }

  const newWeaponType = await Category.create({
    name: categoryName,
    category: 'armor',
  });
  if (newWeaponType === null) throw new Error(); // error handler middleware will display default error
  res.status(StatusCodes.CREATED).redirect('/inventory/armor');
});
// GET ALL ARMOR (category instances)
const allArmor = asyncHandler(async (req, res) => {
  const { armorCategory } = req.params;
  const categoryDoc = await Category.findOne({
    name: armorCategory,
    category: 'armor',
  });
  if (categoryDoc === null) {
    throw new BadRequest(`Could not find ${armorCategory} category`);
  }

  const allArmor = await Armor.find({ type: categoryDoc._id });

  res.render('categoryItems', {
    category: 'armor',
    subCategory: categoryDoc.name,
    categoryItems: allArmor,
  });
});
// GET SINGLE ARMOR instance
const getArmor = asyncHandler(async (req, res) => {
  const { armorCategory, armorName } = req.params;
  const armorDoc = await Armor.findOne({ name: armorName });
  if (armorDoc === null) {
    throw new BadRequest(
      `Could not find ${armorCategory} item with name ${armorName}`,
    );
  }
  res.render('armorDetails', { armor: armorDoc, armorCategory });
});
// CREATE NEW ARMOR (category instance)
const createArmorGet = (req, res) => {
  const { armorCategory } = req.params;

  res.render('armorCreateForm', {
    category: armorCategory,
    itemQualityOptions,
    errors: [],
    formValues: {
      name: '',
      armorPower: 1,
      description: '',
      itemQuality: 'poor',
    },
    buttonDisplay: `Create ${armorCategory}`,
  });
};

const createArmorPost = asyncHandler(async (req, res) => {
  const { armorCategory } = req.params;
  const { name, armorPower, description, itemQuality } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('armorCreateForm', {
      armorCategory,
      itemQualityOptions,
      errors: errors.errors,
      formValues: { name, armorPower, description, itemQuality },
      buttonDisplay: `Create ${armorCategory}`,
    });
    return;
  }

  const armorTypeDoc = await Category.findOne({
    name: armorCategory,
    category: 'armor',
  });

  if (armorTypeDoc === null) {
    throw new BadRequest(`Could not find ${armorCategory} armor category`);
  }
  const newWeapon = await Armor.create({
    name: name,
    type: armorTypeDoc._id,
    armorPower: Number(armorPower),
    description,
    itemQuality,
  });
  if (newWeapon === null) throw new Error(); // error handler middleware will display default error
  res.redirect(`/inventory/armor/${armorCategory}`);
});

module.exports = {
  armorCategories,
  createArmorCategoryGet,
  createArmorCategoryPost,
  allArmor,
  createArmorGet,
  createArmorPost,
  getArmor,
};