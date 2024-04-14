const asyncHandler = require('express-async-handler');
const ItemRarity = require('../models/itemRarity');
const Ability = require('../models/ability');
const Category = require('../models/category');

const getItemOptions = asyncHandler(async (req, res, next) => {
  const [rarityOptions, abilityOptions, category] = await Promise.all([
    ItemRarity.find({}).exec(),
    Ability.find({}).exec(),
    Category.findOne({ name: req.params.categoryName }),
  ]);

  req.rarityOptions = rarityOptions
    .map((item) => ({
      name: item.name,
      abilityCount: item.bonusAbilities,
    }))
    .sort((a, b) => a.abilityCount - b.abilityCount);

  req.abilityOptions = abilityOptions.map((item) => item.name);

  req.maxPower = category.maxPower;

  next();
});

module.exports = getItemOptions;
