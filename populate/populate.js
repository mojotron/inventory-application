require('dotenv').config();
const connectDB = require('../db/connect');

const ItemRarity = require('../models/itemRarity');
const itemRarityData = require('./itemRarity.json');

const populate = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('> connected to database');
    // create item rarity options
    await ItemRarity.deleteMany().exec();
    await ItemRarity.create(itemRarityData);
    console.log('> success');
    process.exit();
  } catch (error) {
    console.log('> failed');
    console.log(error);
  } finally {
    process.exit();
  }
};

populate();
