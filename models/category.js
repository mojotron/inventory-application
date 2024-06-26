const mongoose = require('mongoose');

const categoryTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true,
    lowerCase: true,
    maxLength: 30,
    minLength: 3,
  },
  maxPower: {
    type: Number,
    required: [true, 'power modifier is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Category', categoryTypeSchema);
