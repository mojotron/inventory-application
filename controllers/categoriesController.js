import { StatusCodes } from 'http-status-codes';
import { validationResult, matchedData } from 'express-validator';
import {
  insertCategory,
  selectCategories,
  deleteCategory,
} from '../db/queries.js';
import { DatabaseError } from '../errors/index.js';

const getCategoriesView = async (req, res, next) => {
  try {
    const categories = await selectCategories();
    return res.status(StatusCodes.OK).render('pages/categories', {
      categories: categories.map((cat) => cat.name),
    });
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

    res.status(StatusCodes.OK).redirect('/inventory/categories');
  } catch (error) {
    if (error instanceof DatabaseError) {
      return res.status(StatusCodes.BAD_REQUEST).render('pages/categoryForm', {
        errors: [{ msg: error.message }],
        values: {
          categoryName: req.body.categoryName,
        },
      });
    }
    return next(error);
  }
};

const getDeleteCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.params;

    return res.status(StatusCodes.OK).render('pages/deleteConfirm', {
      heading: 'Delete Category',
      confirmMessage: `You are about to delete ${categoryName} category. Are you sure?`,
      queryParam: categoryName,
    });
  } catch (error) {
    return next(error);
  }
};

const postDeleteCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.params;
    await deleteCategory(categoryName);
    return res.status(StatusCodes.OK).redirect('/inventory/categories');
  } catch (error) {
    return next(error);
  }
};

export {
  getCategoriesView,
  getCreateCategory,
  postCreateCategory,
  getDeleteCategory,
  postDeleteCategory,
};
