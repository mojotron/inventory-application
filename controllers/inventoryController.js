import { StatusCodes } from 'http-status-codes';
import {
  insertItem,
  selectCategories,
  selectItemByCategoryAndName,
  selectItemsByCategory,
  deleteItem,
  updateItem,
} from '../db/queries.js';
import { validationResult, matchedData } from 'express-validator';
import DatabaseError from '../errors/DatabaseError.js';

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

    const items = await selectItemsByCategory(categoryName);

    console.log(items);

    return res.status(StatusCodes.OK).render('pages/inventory', {
      categories,
      activeCategory,
      items,
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
    actionPath: `/inventory/${categoryName}/new`,
    errors: [],
    values: {
      itemName: '',
      itemDescription: '',
      itemPrice: 0,
      itemQuantity: 0,
    },
  });
};

const postCreateItem = async (req, res, next) => {
  try {
    const { categoryName } = req.params;

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).render('pages/itemForm', {
        categoryName,
        update: false,
        actionPath: `/inventory/${categoryName}/new`,
        errors: result.array(),
        values: {
          itemName: req.body.itemName,
          itemDescription: req.body.itemDescription,
          price: req.body.itemPrice,
          itemQuantity: req.body.itemQuantity,
        },
      });
    }
    const { itemName, itemDescription, itemPrice, itemQuantity } =
      matchedData(req);
    await insertItem(
      categoryName,
      itemName,
      itemDescription,
      itemQuantity,
      itemPrice,
    );

    return res.status(StatusCodes.OK).redirect(`/inventory/${categoryName}`);
  } catch (error) {
    if (error instanceof DatabaseError) {
      return res.status(StatusCodes.BAD_REQUEST).render('pages/itemForm', {
        categoryName: req.params.categoryName,
        update: false,
        actionPath: `/inventory/${req.params.categoryName}/new`,
        errors: [{ msg: error.message }],
        values: {
          itemName: req.body.itemName,
          itemDescription: req.body.itemDescription,
          price: req.body.itemPrice,
          itemQuantity: req.body.itemQuantity,
        },
      });
    }
    return next(error);
  }
};

const getInventoryItemDetails = async (req, res, next) => {
  const { categoryName, itemName } = req.params;
  const details = await selectItemByCategoryAndName(categoryName, itemName);
  console.log(details);
  try {
    return res.status(StatusCodes.OK).render('pages/itemDetails', {
      activeCategory: categoryName,
      activeItem: itemName,
      details,
    });
  } catch (error) {
    return next(error);
  }
};

const getDeleteItem = (req, res) => {
  const { categoryName, itemName } = req.params;

  res.status(StatusCodes.OK).render('pages/deleteConfirm', {
    heading: 'Delete Item',
    confirmMessage: `You are about to delete ${itemName} item in ${categoryName} category. Are you sure?`,
    actionPath: `/inventory/${categoryName}/${itemName}/delete`,
    cancelPath: `/inventory/${categoryName}/${itemName}`,
  });
};

const postDeleteItem = async (req, res, next) => {
  try {
    const { categoryName, itemName } = req.params;

    await deleteItem(categoryName, itemName);

    res.status(StatusCodes.OK).redirect(`/inventory/${categoryName}`);
  } catch (error) {
    return next(error);
  }
};

const getUpdateItem = async (req, res) => {
  try {
    const { categoryName, itemName } = req.params;

    const details = await selectItemByCategoryAndName(categoryName, itemName);

    return res.status(StatusCodes.OK).render('pages/itemForm', {
      categoryName,
      update: true,
      actionPath: `/inventory/${categoryName}/${itemName}/update`,
      errors: [],
      values: {
        itemName: details.name,
        itemDescription: details.description,
        itemPrice: details.price,
        itemQuantity: details.quantity,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const postUpdateItem = async (req, res, next) => {
  try {
    const { categoryName } = req.params;

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).render('pages/itemForm', {
        categoryName,
        update: true,
        actionPath: `/inventory/${categoryName}/${req.params.itemName}/update`,
        errors: result.array(),
        values: {
          itemName: req.body.itemName,
          itemDescription: req.body.itemDescription,
          price: req.body.itemPrice,
          itemQuantity: req.body.itemQuantity,
        },
      });
    }

    const { itemName, itemDescription, itemPrice, itemQuantity } =
      matchedData(req);

    await updateItem(
      categoryName,
      req.body.itemName,
      itemName,
      itemDescription,
      itemQuantity,
      itemPrice,
    );

    return res
      .status(StatusCodes.OK)
      .redirect(`/inventory/${categoryName}/${req.params.itemName}`);
  } catch (error) {
    if (error instanceof DatabaseError) {
      return res.status(StatusCodes.BAD_REQUEST).render('pages/itemForm', {
        categoryName: req.params.categoryName,
        update: true,
        actionPath: `/inventory/${req.params.categoryName}/${req.params.itemName}/update`,
        errors: [{ msg: error.message }],
        values: {
          itemName: req.body.itemName,
          itemDescription: req.body.itemDescription,
          price: req.body.itemPrice,
          itemQuantity: req.body.itemQuantity,
        },
      });
    }
    return next(error);
  }
};

export {
  getInventoryView,
  getCreateItem,
  postCreateItem,
  getInventoryItemDetails,
  getDeleteItem,
  postDeleteItem,
  getUpdateItem,
  postUpdateItem,
};
