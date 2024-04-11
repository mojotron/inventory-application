const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const Weapon = require('../models/weapon');
const Ability = require('../models/ability');
const ItemRarity = require('../models/itemRarity');
const CategoryItem = require('../models/categoryItem');

const createWeaponGet = asyncHandler(async (req, res) => {
  const { categoryName, categoryItemName } = req.params;
  const { rarityOptions, abilityOptions } = req;

  res.render('createItemForm', {
    categoryName,
    categoryItemName,
    itemRarity: rarityOptions,
    abilities: abilityOptions,
    fromInputs: {
      name: '',
      description: '',
      // TODO item power value min max
      rarity: rarityOptions[0].name,
      abilities: [],
    },
    errors: [],
  });
});

const createWeaponPost = asyncHandler(async (req, res) => {
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

  console.log(abilityDocs);

  const rarityDoc = await ItemRarity.findOne({ name: itemRarity });

  const categoryItemDoc = await CategoryItem.findOne({
    name: req.params.categoryItemName,
  });

  if (rarityDoc === null || categoryItemDoc === null) {
    throw new Error();
  }
  console.log(categoryItemDoc);

  const newWeapon = await Weapon.create({
    name: itemName,
    category: categoryItemDoc.category,
    categoryItem: categoryItemDoc._id,
    attackPower: itemPower,
    description: itemDescription,
    itemQuality: rarityDoc._id,
    abilities: abilityDocs.map((ability) => ability._id),
  });

  if (newWeapon.length === 0) {
    throw new Error();
  }

  res.status(StatusCodes.CREATED).redirect('/');
});

module.exports = { createWeaponGet, createWeaponPost };
