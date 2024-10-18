import { StatusCodes } from 'http-status-codes';
import { validationResult, matchedData } from 'express-validator';
import {
  insertCategory,
  selectCategories,
  deleteCategory,
  updateCategory,
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
    update: false,
    actionPath: `/categories/new`,
    values: {
      categoryName: '',
    },
  });
};

const postCreateCategory = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array();
      return res.status(StatusCodes.BAD_REQUEST).render('pages/categoryForm', {
        errors,
        actionPath: `/categories/new`,
        update: false,
        values: {
          categoryName: req.body.categoryName,
        },
      });
    }

    const { categoryName } = matchedData(req);

    await insertCategory(categoryName.toLowerCase());

    res.status(StatusCodes.OK).redirect('/categories');
  } catch (error) {
    if (error instanceof DatabaseError) {
      return res.status(StatusCodes.BAD_REQUEST).render('pages/categoryForm', {
        errors: [{ msg: error.message }],
        update: false,
        actionPath: `/categories/new`,
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
      confirmMessage: `You are about to delete ${categoryName.toUpperCase()} category and ALL items it this category. Are you sure?`,
      actionPath: `/categories/${categoryName}/delete`,
      cancelPath: `/categories`,
    });
  } catch (error) {
    return next(error);
  }
};

const postDeleteCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.params;
    await deleteCategory(categoryName);
    return res.status(StatusCodes.OK).redirect('/categories');
  } catch (error) {
    return next(error);
  }
};

const getUpdateCategory = async (req, res, next) => {
  const { categoryName } = req.params;

  try {
    return res.status(StatusCodes.OK).render('pages/categoryForm', {
      errors: [],
      update: true,
      actionPath: `/categories/${categoryName}/update`,
      values: {
        categoryName: `${categoryName}`,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const postUpdateCategory = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array();
      return res.status(StatusCodes.BAD_REQUEST).render('pages/categoryForm', {
        errors,
        update: true,
        actionPath: `/categories/${req.body.categoryName}/update`,
        values: {
          categoryName: req.body.categoryName,
        },
      });
    }

    const { categoryName } = matchedData(req);

    await updateCategory(req.params.categoryName, categoryName);

    res.status(StatusCodes.OK).redirect('/categories');
  } catch (error) {
    if (error instanceof DatabaseError) {
      return res.status(StatusCodes.BAD_REQUEST).render('pages/categoryForm', {
        errors: [{ msg: error.message }],
        update: true,
        actionPath: `/categories/${req.body.categoryName}/update`,
        values: {
          categoryName: req.body.categoryName,
        },
      });
    }
    return next(error);
  }
};

export {
  getCategoriesView,
  getCreateCategory,
  postCreateCategory,
  getDeleteCategory,
  postDeleteCategory,
  getUpdateCategory,
  postUpdateCategory,
};
