const { StatusCodes } = require('http-status-codes');
const Category = require('../models/category');
const asyncHandler = require('express-async-handler');

const renderLayout = asyncHandler(async (req, res) => {
  const categoryDocs = await Category.find({}).exec();
  res
    .status(StatusCodes.OK)
    .render('layout', { categories: categoryDocs.map((doc) => doc.name) });
});

module.exports = { renderLayout };
