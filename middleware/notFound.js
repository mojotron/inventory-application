const { StatusCodes } = require('http-status-codes');

const notFoundMiddleware = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).render('notFound');
};

module.exports = notFoundMiddleware;
