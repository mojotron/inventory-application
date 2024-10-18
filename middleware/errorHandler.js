import { StatusCodes } from 'http-status-codes';
import { BadRequest, DatabaseError } from '../errors/index.js';

/* eslint-disable */
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof BadRequest) {
    return res.status(err.statusCode).render('pages/error', {
      heading: 'Bad Request (400)',
      text: err.message,
    });
  }
  if (err instanceof DatabaseError) {
    return res.status(err.statusCode).render('pages/error', {
      heading: 'Database error (500)',
      text: `${err.message}. Please try again later!`,
    });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).render('pages/error', {
    heading: 'Server Error (500)',
    text: 'There was unexpected server error, please try again!',
  });
};

export default errorHandler;
