const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'weapon name is required'],
    minLength: 3,
    maxLength: 25,
    unique: true,
    lowercase: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'category is required'],
  },
  categoryItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CategoryItem',
    required: [true, 'weapon type is required'],
  },
  itemPower: {
    type: Number,
    min: 1,
    max: 20,
    default: 5,
  },
  description: {
    type: String,
    minLength: 3,
    maxLength: 150,
    required: true,
  },
  itemQuality: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ItemRarity',
  },
  abilities: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Ability',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Weapon', itemSchema);
