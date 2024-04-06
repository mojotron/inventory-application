const asyncHandler = require('express-async-handler');
// models
const Category = require('../models/category');
const CategoryItem = require('../models/categoryItem');

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

const getAllItems = asyncHandler(async () => {});

const createWeapon = asyncHandler(async () => {});

module.exports = { getCategories, getCategoryItems };
