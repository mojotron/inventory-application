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
  const { categoryName } = req.params;

  const categoryDoc = await Category.findOne({
    name: categoryName,
  }).exec();

  if (categoryDoc === null) {
    return res.status(StatusCodes.NOT_FOUND).render('notFound');
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

  const [rarityDoc, ...abilityDocs] = await Promise.all([
    ItemRarity.findById(item.itemQuality).exec(),
    ...item.abilities.map(async (ability) => {
      return await Ability.findById(ability).exec();
    }),
  ]);
  // MODIFIERS calculation (simple one just for fun)
  const abilitiesWithModifier = abilityDocs.map((abilityDoc) => {
    const { name, modifier } = abilityDoc;
    return {
      name,
      power: item.itemPower * modifier * rarityDoc.abilityModifier,
    };
  });

  res.render('itemDetails', {
    category: categoryName,
    categoryItem: categoryItemName,
    item,
    powerModifier: rarityDoc.powerModifier,
    itemQuality: rarityDoc,
    abilities: abilitiesWithModifier,
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
      name: '',
      description: '',
      itemPower: { value: 1, min: 1, max: maxPower },
      rarity: rarityOptions[0].name,
      abilities: [],
    },
    errors: [],
    actionText: 'create',
  });
});

const createItemPost = asyncHandler(async (req, res) => {
  const { categoryName, categoryItemName } = req.params;
  const { rarityOptions, abilityOptions } = req;
  const { itemName, itemDescription, itemPower, itemRarity, ...abilities } =
    req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
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
      actionText: 'create',
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
    name: itemName,
    category: categoryId,
    categoryItem: categoryItemId,
  });

  if (itemExists) {
    throw new Error('weapon with name exists');
  }

  const newItem = await Item.create({
    name: itemName,
    category: categoryId,
    categoryItem: categoryItemId,
    itemPower: itemPower,
    description: itemDescription,
    itemQuality: rarityDoc._id,
    abilities: abilityDocs?.map((ability) => ability._id),
  });

  if (newItem.length === 0) {
    throw new Error(); // throw internal server error
  }

  res
    .status(StatusCodes.CREATED)
    .redirect(`/inventory/${categoryName}/${categoryItemName}`);
});

const updateItemGet = asyncHandler(async (req, res) => {
  const { categoryName, categoryItemName, itemName } = req.params;
  const { rarityOptions, abilityOptions, maxPower } = req;

  const item = await Item.findOne({ name: itemName }).exec();

  const [rarityDoc, ...abilityDocs] = await Promise.all([
    ItemRarity.findById(item.itemQuality).exec(),
    ...item.abilities.map(async (ability) => {
      return await Ability.findById(ability).exec();
    }),
  ]);

  res.render('createItemForm', {
    categoryName,
    categoryItemName,
    itemRarity: rarityOptions,
    abilities: abilityOptions,
    formInputs: {
      name: item.name,
      description: item.description,
      itemPower: { value: item.itemPower, min: 1, max: maxPower },
      rarity: rarityDoc.name,
      abilities: abilityDocs.map((ability) => ability.name),
    },
    errors: [],
    actionText: 'update',
  });
});

const updateItemPost = asyncHandler(async (req, res) => {
  const { categoryName, categoryItemName } = req.params;
  const { rarityOptions, abilityOptions } = req;
  const { itemName, itemDescription, itemPower, itemRarity, ...abilities } =
    req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
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
      actionText: 'update',
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
    name: itemName,
    category: categoryId,
    categoryItem: categoryItemId,
  });

  if (itemExists === null) {
    throw new Error('weapon with name exists');
  }

  const updatedItem = await Item.findByIdAndUpdate(
    itemExists._id,
    {
      name: itemName,
      category: categoryId,
      categoryItem: categoryItemId,
      itemPower: itemPower,
      description: itemDescription,
      itemQuality: rarityDoc._id,
      abilities: abilityDocs?.map((ability) => ability._id),
    },
    { new: true },
  );

  if (updatedItem === null) {
    throw new Error(); // throw internal server error
  }

  res
    .status(StatusCodes.OK)
    .redirect(`/inventory/${categoryName}/${categoryItemName}`);
});

const deleteItemGet = asyncHandler(async (req, res) => {
  const { categoryName, categoryItemName, itemName } = req.params;

  res.render('deleteItem', {
    category: categoryName,
    categoryItem: categoryItemName,
    item: itemName,
  });
});

const deleteItemPost = asyncHandler(async (req, res) => {
  const { categoryName, categoryItemName, itemName } = req.params;
  const [categoryDoc, categoryNameDoc] = await Promise.all([
    Category.findOne({ name: categoryName }).exec(),
    CategoryItem.findOne({ name: categoryItemName }).exec(),
  ]);
  //
  const item = await Item.findOneAndDelete({
    name: itemName,
    category: categoryDoc._id,
    categoryItem: categoryNameDoc._id,
  });

  if (item === null) {
    throw new Error();
  }

  res.redirect(`/inventory/${categoryName}`);
});

module.exports = {
  getCategoryItems,
  getAllItems,
  getItem,
  createItemGet,
  createItemPost,
  updateItemGet,
  updateItemPost,
  deleteItemGet,
  deleteItemPost,
};
