import { StatusCodes } from 'http-status-codes';
import { validationResult, matchedData } from 'express-validator';

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

const postCreateCategory = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log(result);
      const errors = result.array();
      return res.status(StatusCodes.BAD_REQUEST).render('pages/categoryForm', {
        errors,
      });
    }
    res.json({ msg: 'success' });
  } catch (error) {
    return next(error);
  }
};

export { getCategoriesView, getCreateCategory, postCreateCategory };
