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
  const existingArmorCategories = await Category.find({
    category: 'armor',
  }).select('name');

  res.status(StatusCodes.OK).render('categoryForm', {
    categoryName: 'create new armor category',
    inputPlaceholder: 'sword, axe, eg.',
    inputValue: '',
    errors: [],
  });
});

module.exports = { armorCategories, createArmorCategoryGet };
