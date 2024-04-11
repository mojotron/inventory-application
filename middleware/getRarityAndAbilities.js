const asyncHandler = require('express-async-handler');
const ItemRarity = require('../models/itemRarity');
const Ability = require('../models/ability');

const getFormRarityAndAbilities = asyncHandler(async (req, res, next) => {
  const [rarityOptions, abilityOptions] = await Promise.all([
    ItemRarity.find({}).exec(),
    Ability.find({}).exec(),
  ]);

  req.rarityOptions = rarityOptions
    .map((item) => ({
      name: item.name,
      abilityCount: item.bonusAbilities,
    }))
    .sort((a, b) => a.abilityCount - b.abilityCount);

  req.abilityOptions = abilityOptions.map((item) => item.name);

  next();
});

module.exports = getFormRarityAndAbilities;
