const mongoose = require('mongoose');

const categoryItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'category item must have name'],
    minLength: 3,
    maxLength: 25,
    lowercase: true,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('CategoryItem', categoryItemSchema);
