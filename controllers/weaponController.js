const { body } = require('express-validator');
const asyncHandler = require('express-async-handler');

const createWeaponGet = asyncHandler(async (req, res) => {
  const { categoryName, categoryItemName } = req.params;
  // use to render options
  const { rarity, ability } = req;

  res.render('createItemForm', {
    categoryName,
    categoryItemName,
    rarity,
    ability,
    fromInputs: {
      name: '',
      description: '',
    },
  });
});

const createWeaponPost = asyncHandler(async (req, res) => {
  res.send('create weapon post');
});

module.exports = { createWeaponGet, createWeaponPost };
