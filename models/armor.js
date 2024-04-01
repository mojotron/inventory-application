const mongoose = require('mongoose');
const itemQuality = require('../constants/itemQuality');

const armorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'armor name is required'],
    unique: true,
    minlength: 3,
    maxLength: 25,
    lowercase: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'armor type is required'],
  },
  armorPower: {
    type: Number,
    min: 1,
    max: 25,
    default: 5,
  },
  description: {
    type: String,
    minlength: 3,
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

armorSchema.virtual('url').get(function () {
  return `/inventory/armor/${this.name}`;
});

module.exports = mongoose.model('Armor', armorSchema);
