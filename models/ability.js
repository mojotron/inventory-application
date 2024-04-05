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
  lowModifier: {
    type: Number,
    default: 0,
  },
  highModifier: {
    type: Number,
    default: 10,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Ability', abilitySchema);
