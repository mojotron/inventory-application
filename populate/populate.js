require('dotenv').config();
const connectDB = require('../db/connect');
// models
const ItemRarity = require('../models/itemRarity');
const Category = require('../models/category');
const CategoryItem = require('../models/categoryItem');
const Ability = require('../models/ability');
// data
const { CATEGORIES, ABILITIES, ITEM_RARITY } = require('./data');

const populate = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('> connected to database');
    // create item rarity options
    await ItemRarity.deleteMany();
    await ItemRarity.create(ITEM_RARITY);
    console.log('> item rarity created');
    // create categories
    await Category.deleteMany();
    const categories = await Category.create(
      CATEGORIES.map((category) => ({
        name: category.name,
        maxPower: category.maxPower,
      })),
    );
    console.log('> categories created');
    // create category items
    await CategoryItem.deleteMany();

    const categoryItems = categories.reduce((result, category) => {
      const categoryItemList = CATEGORIES.find(
        (item) => item.name === category.name,
      );

      const items = categoryItemList.categories.map((item) => {
        return { name: item, category: category._id };
      });

      return [...result, ...items];
    }, []);

    await CategoryItem.create(categoryItems);
    console.log('> category items created');

    // create abilities
    await Ability.deleteMany();
    await Ability.create(
      ABILITIES.map((ability) => ({
        name: ability.name,
        modifier: ability.modifier,
      })),
    );
    console.log('> abilities created');

    // exit
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
