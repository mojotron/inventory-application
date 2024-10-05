import { StatusCodes } from 'http-status-codes';
import { selectCategories } from '../db/queries.js';

const getInventoryView = async (req, res, next) => {
  try {
    const categories = await selectCategories();

    return res.status(StatusCodes.OK).render('pages/inventory', {
      categories: categories.map((cat) => cat.name),
    });
  } catch (error) {
    return next(error);
  }
};

export { getInventoryView };
