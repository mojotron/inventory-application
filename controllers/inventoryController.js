import { StatusCodes } from 'http-status-codes';
import { selectCategories } from '../db/queries.js';

const getInventoryView = async (req, res, next) => {
  try {
    const { categoryName } = req.params;

    const categoryList = await selectCategories();
    const categories = categoryList.map((cat) => cat.name);
    const activeCategory = categories.find((c) => c === categoryName);

    if (categoryName === undefined || activeCategory === undefined) {
      return res.status(StatusCodes.OK).render('pages/inventory', {
        categories,
        activeCategory,
        items: null,
      });
    }

    return res.status(StatusCodes.OK).render('pages/inventory', {
      categories,
      activeCategory,
      items: ['a', 'b', 'c'],
    });
  } catch (error) {
    return next(error);
  }
};

const getCreateItem = (req, res) => {
  const { categoryName } = req.params;

  return res.status(StatusCodes.OK).render('pages/itemForm', {
    categoryName,
    update: false,
    actionPath: 'x',
    errors: [],
    values: {
      itemName: '',
      itemDescription: '',
      price: 0,
      itemQuantity: 0,
    },
  });
};

export { getInventoryView, getCreateItem };
