const { body } = require('express-validator');
const asyncHandler = require('express-async-handler');

const createWeaponGet = asyncHandler(async (req, res) => {
  const { categoryName, categoryItemName } = req.params;
  // use to render options
  const { rarity, ability } = req;

  res.render('createItemForm', {
    categoryName,
    categoryItemName,
    itemRarity: rarity,
    abilities: ability,
    fromInputs: {
      name: '',
      description: '',
      rarity: rarity[0].name,
    },
  });
});

const createWeaponPost = asyncHandler(async (req, res) => {
  res.send('create weapon post');
});

module.exports = { createWeaponGet, createWeaponPost };
