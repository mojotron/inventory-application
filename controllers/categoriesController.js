import { StatusCodes } from 'http-status-codes';
import { validationResult, matchedData } from 'express-validator';
import { insertCategory } from '../db/queries.js';

const getCategoriesView = async (req, res, next) => {
  try {
    return res.status(StatusCodes.OK).render('pages/categories');
  } catch (error) {
    return next(error);
  }
};

const getCreateCategory = (req, res) => {
  return res.status(StatusCodes.OK).render('pages/categoryForm', {
    errors: [],
    values: {
      categoryName: '',
    },
  });
};

const postCreateCategory = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log(result);
      const errors = result.array();
      return res.status(StatusCodes.BAD_REQUEST).render('pages/categoryForm', {
        errors,
        values: {
          categoryName: req.body.categoryName,
        },
      });
    }
    const { categoryName } = matchedData(req);
    await insertCategory(categoryName);

    res.status(StatusCodes.OK).render('pages/categories');
  } catch (error) {
    return next(error);
  }
};

export { getCategoriesView, getCreateCategory, postCreateCategory };
