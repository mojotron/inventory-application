const mongoose = require('mongoose');

const itemRaritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'rarity name is required'],
    unique: true,
    lowercase: true,
  },
  powerModifier: {
    type: Number,
    required: [true, 'power modifier is required'],
    unique: true,
  },
  priceModifier: {
    type: Number,
    required: [true, 'price modifier is required'],
    unique: true,
  },
  bonusAbilities: {
    type: Number,
    required: [true, 'bonus ability counter is required'],
    unique: true,
  },
  abilityModifier: {
    type: Number,
    required: [true, 'ability modifier is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('ItemRarity', itemRaritySchema);
