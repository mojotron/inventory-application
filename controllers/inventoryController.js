const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
// models
const Item = require('../models/Item');
const Category = require('../models/category');
const CategoryItem = require('../models/categoryItem');
const ItemRarity = require('../models/itemRarity');
const Ability = require('../models/ability');

const { createWeaponGet, createWeaponPost } = require('./weaponController');

const getCategories = asyncHandler(async (req, res) => {
  const allCategoryItems = await CategoryItem.find({}).exec();
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

  res.render('categoryItemList', { categoryItems: allCategoryItemNames });
});

const getAllItems = asyncHandler(async (req, res) => {
  const { categoryName, categoryItemName } = req.params;
  res.send(`get all items: [${categoryName}, ${categoryItemName}]`);
});
// CREATE Item instance TODO TODO TODO
const createItemGet = asyncHandler(async (req, res) => {
  const { categoryName, categoryItemName } = req.params;
  const { rarityOptions, abilityOptions } = req;

  res.render('createItemForm', {
    categoryName,
    categoryItemName,
    itemRarity: rarityOptions,
    abilities: abilityOptions,
    formInputs: {
      name: 'forsaken blade',
      description: 'describe your weapon',
      itemPower: { value: 1, min: 1, max: 20 },
      rarity: rarityOptions[0].name,
      abilities: [],
    },
    errors: [],
  });
});

const createItemPost = asyncHandler(async (req, res) => {
  const { categoryName, categoryItemName } = req.params;
  const { rarityOptions, abilityOptions } = req;
  const { itemName, itemDescription, itemPower, itemRarity, ...abilities } =
    req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    res.render('createItemForm', {
      categoryName,
      categoryItemName,
      itemRarity: rarityOptions,
      abilities: abilityOptions,
      fromInputs: {
        name: itemName,
        description: itemDescription,
        rarity: itemRarity,
      },
      errors: errors.errors,
    });
    return;
  }

  const abilityNames = Object.keys(abilities).map(
    (ability) => ability.split('-')[1],
  );

  let abilityDocs;
  if (abilityNames.length > 0) {
    abilityDocs = await Promise.all(
      abilityNames.map((ability) => Ability.findOne({ name: ability })),
    );
  }

  const rarityDoc = await ItemRarity.findOne({ name: itemRarity });
  const categoryItemDoc = await CategoryItem.findOne({
    name: req.params.categoryItemName,
  });

  if (rarityDoc === null || categoryItemDoc === null) {
    throw new Error();
  }

  const { category: categoryId, _id: categoryItemId } = categoryItemDoc;

  const itemExists = await Item.findOne({
    itemName,
    category: categoryId,
    categoryItem: categoryItemId,
  });

  if (itemExists) {
    throw new Error('weapon with name exists');
  }

  const newWeapon = await Item.create({
    name: itemName,
    category: categoryId,
    categoryItem: categoryItemId,
    itemPower: itemPower,
    description: itemDescription,
    itemQuality: rarityDoc._id,
    abilities: abilityDocs.map((ability) => ability._id),
  });

  if (newWeapon.length === 0) {
    throw new Error(); // throw internal server error
  }

  res.status(StatusCodes.CREATED).redirect('/');
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
