const mongoose = require('mongoose');

const weaponTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true,
    lowerCase: true,
    maxLength: 30,
    minLength: 3,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

weaponTypeSchema.virtual('url').get(function () {
  return `/inventory/weapons/${this.name}`;
});

module.exports = mongoose.model('WeaponType', weaponTypeSchema);
