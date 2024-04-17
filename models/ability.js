const mongoose = require('mongoose');

const abilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'ability name is required'],
    unique: true,
    lowercase: true,
    minLength: 3,
    maxLength: 25,
  },
  modifier: {
    type: Number,
    default: 1,
    min: 0,
    max: 2,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Ability', abilitySchema);
