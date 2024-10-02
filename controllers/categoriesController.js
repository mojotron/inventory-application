import { StatusCodes } from 'http-status-codes';

const getCategoriesView = async (req, res, next) => {
  try {
    return res.status(StatusCodes.OK).render('pages/categories');
  } catch (error) {
    return next(error);
  }
};

const getCreateCategory = (req, res) => {
  return res.status(StatusCodes.OK).render('pages/categoryForm');
};

export { getCategoriesView, getCreateCategory };
