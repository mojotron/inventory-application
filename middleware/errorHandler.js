const { StatusCodes } = require('http-status-codes');
const { BadRequest } = require('../errors');

/* eslint-disable */
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof BadRequest) {
    res.status(err.status).render('error', { message: err.message });
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .render('error', {
      message: 'There was unexpected server error, please try again',
    });
};

module.exports = errorHandler;
