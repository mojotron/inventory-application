const mongoose = require('mongoose');
const itemQuality = require('../constants/itemQuality');

const weaponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'weapon name is required'],
    minLength: 3,
    maxLength: 25,
    unique: true,
    lowercase: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WeaponType',
    required: [true, 'weapon type is required'],
  },
  attackPower: {
    type: Number,
    min: 1,
    max: 100,
    default: 5,
  },
  description: {
    type: String,
    minLength: 3,
    maxLength: 150,
    required: true,
  },
  itemQuality: {
    type: String,
    enum: {
      values: [...itemQuality],
      message: '{VALUE} not supported',
      lowercase: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Weapon', weaponSchema);
