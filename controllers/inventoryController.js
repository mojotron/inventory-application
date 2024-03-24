const WeaponType = require('../models/weaponType');

const allWeaponTypes = async (req, res) => {
  const allWeaponTypes = await WeaponType.find({}).sort({ name: 1 });
  res.render('weaponList', { weaponTypeList: allWeaponTypes });
};

const createWeaponTypeGet = async (req, res) => {
  res.render('weaponTypeForm', { error: undefined });
};

const createWeaponTypePost = async (req, res) => {
  const { weaponTypeName } = req.body;
  const weaponExist = await WeaponType.findOne({ name: weaponTypeName });

  if (weaponExist) {
    res.render('weaponTypeForm', {
      error: `${weaponTypeName} already exists!`,
    });
    return;
  }
  await WeaponType.create({ name: weaponTypeName });
  res.redirect('/inventory/weapons');
};

module.exports = { allWeaponTypes, createWeaponTypeGet, createWeaponTypePost };
