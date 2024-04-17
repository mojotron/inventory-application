const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
// models
const Item = require('../models/Item');
const Category = require('../models/category');
const CategoryItem = require('../models/categoryItem');
const ItemRarity = require('../models/itemRarity');
const Ability = require('../models/ability');

const getCategoryItems = asyncHandler(async (req, res) => {
  // get all item types in category
  const { categoryName } = req.params;

  const categoryDoc = await Category.findOne({
    name: categoryName,
  }).exec();

  if (categoryDoc === null) {
    return res.json({ msg: `${categoryName} category not exist!` });
  }

  const allCategoryItems = await CategoryItem.find({
    category: categoryDoc._id,
  }).exec();

  // get categoryItem name and instance items count
  const itemsPerCategory = await Promise.all(
    allCategoryItems.map(async (item) => {
      const items = await Item.find({ categoryItem: item._id })
        .select('categoryItem')
        .exec();
      return { name: item.name, count: items.length };
    }),
  );

  res.status(StatusCodes.OK).render('categoryItemList', {
    categoryName,
    categoryItems: itemsPerCategory,
  });
});

const getAllItems = asyncHandler(async (req, res) => {
  const { categoryName, categoryItemName } = req.params;
  const [categoryDoc, categoryItemDoc, rarityDocs] = await Promise.all([
    Category.findOne({ name: categoryName }),
    CategoryItem.findOne({ name: categoryItemName }),
    ItemRarity.find({}),
  ]);

  let items = await Item.find({
    category: categoryDoc._id,
    categoryItem: categoryItemDoc._id,
  })
    .select('name description itemQuality')
    .exec();

  items = items.map((item) => {
    const rarity = rarityDocs.find((doc) => doc._id.equals(item.itemQuality));

    console.log(rarity);
    return {
      name: item.name,
      description: item.description,
      itemRarity: rarity.name,
    };
  });

  res.render('itemsInCategory', {
    category: categoryName,
    categoryItem: categoryItemName,
    items,
  });
});

const getItem = asyncHandler(async (req, res) => {
  const { categoryName, categoryItemName, itemName } = req.params;

  const item = await Item.findOne({ name: itemName });

  console.log(item.abilities);

  const [rarityDoc, ...abilityDocs] = await Promise.all([
    ItemRarity.findById(item.itemQuality).exec(),
    ...item.abilities.map(async (ability) => {
      console.log(ability);
      return await Ability.findById(ability).exec();
    }),
  ]);
  // TODO MODIFIERS
  res.render('itemDetails', {
    category: categoryName,
    categoryItem: categoryItemName,
    item,
    itemQuality: rarityDoc,
  });
});
// CREATE Item instance
const createItemGet = asyncHandler(async (req, res) => {
  const { categoryName, categoryItemName } = req.params;
  const { rarityOptions, abilityOptions, maxPower } = req;

  res.render('createItemForm', {
    categoryName,
    categoryItemName,
    itemRarity: rarityOptions,
    abilities: abilityOptions,
    formInputs: {
      name: 'forsaken blade',
      description: 'describe your weapon',
      itemPower: { value: 1, min: 1, max: maxPower },
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
    abilities: abilityDocs?.map((ability) => ability._id),
  });

  if (newWeapon.length === 0) {
    throw new Error(); // throw internal server error
  }

  res
    .status(StatusCodes.CREATED)
    .redirect(`/inventory/${categoryName}/${categoryItemName}`);
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
  getCategoryItems,
  getAllItems,
  getItem,
  createItemGet,
  createItemPost,
  updateItem,
  deleteItem,
};
