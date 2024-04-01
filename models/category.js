const mongoose = require('mongoose');
const categories = require('../constants/categories');

const categoryTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true,
    lowerCase: true,
    maxLength: 30,
    minLength: 3,
  },
  category: {
    type: String,
    enum: {
      values: categories,
      message: `{VALUE} not supported (${categories.join(',')})`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

categoryTypeSchema.virtual('url').get(function () {
  return `/inventory/${this.category}/${this.name}`;
});

module.exports = mongoose.model('Category', categoryTypeSchema);
