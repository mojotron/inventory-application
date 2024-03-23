const mongoose = require('mongoose');
const weaponType = require('../constants/weaponType.js');

const weaponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'weapon name is required'],
  },
  type: {
    type: String,
    required: [true, 'weapon type is required'],
    enum: {
      values: weaponType,
      message: 'weapon type {VALUE} is not supported',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

exports.module = mongoose.model('Weapon', weaponSchema);
