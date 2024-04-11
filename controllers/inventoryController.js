const asyncHandler = require('express-async-handler');
// models
const Category = require('../models/category');
const CategoryItem = require('../models/categoryItem');
const ItemRarity = require('../models/itemRarity');
const Ability = require('../models/ability');

const { createWeaponGet, createWeaponPost } = require('./weaponController');

const getCategories = asyncHandler(async (req, res) => {
  const allCategory = await Category.find({}).exec();
  const categoryNames = allCategory.map((category) => category.name);
  res.json({ categories: categoryNames });
});

const getCategoryItems = asyncHandler(async (req, res) => {
  const { categoryName } = req.params;

  const categoryDoc = await Category.findOne({ name: categoryName }).exec();
  console.log(categoryDoc);
  if (categoryDoc === null) {
    return res.json({ msg: `${categoryName} category not exist!` });
  }
  const allCategoryItems = await CategoryItem.find({
    category: categoryDoc._id,
  }).exec();

  const allCategoryItemNames = allCategoryItems.map(
    (categoryName) => categoryName.name,
  );

  res.json({ categoryItems: allCategoryItemNames });
});

const getAllItems = asyncHandler(async (req, res) => {
  const { categoryName, categoryItemName } = req.params;
  res.send(`get all items: [${categoryName}, ${categoryItemName}]`);
});
// CREATE Item instance TODO TODO TODO
const createItemGet = asyncHandler(async (req, res) => {
  const { categoryName } = req.params;

  switch (categoryName) {
    case 'weapon':
      return createWeaponGet(req, res);
    default:
      return res.send(`${categoryName} category is not supported`);
  }
});

const createItemPost = asyncHandler(async (req, res) => {
  const { categoryName } = req.params;

  switch (categoryName) {
    case 'weapon':
      return createWeaponPost(req, res);
    default:
      return res.send(`${categoryName} category is not supported`);
  }
});

const updateItem = asyncHandler(async (req, res) => {
  const { categoryName, categoryItemName, itemName } = req.params;
  res.send(`update item: [${categoryName}, ${categoryItemName}], ${itemName}`);
});

const deleteItem = asyncHandler(async (req, res) => {
  const { categoryName, categoryItemName, itemName } = req.params;
  res.send(`get all item: [${categoryName}, ${categoryItemName}, ${itemName}]`);
});

module.exports = {
  //
  getCategories,
  getCategoryItems,
  getAllItems,
  createItemGet,
  createItemPost,
  updateItem,
  deleteItem,
};
