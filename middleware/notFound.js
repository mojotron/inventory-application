import { StatusCodes } from 'http-status-codes';

const notFoundMiddleware = (req, res, next) => {
  return res.status(StatusCodes.NOT_FOUND).render('pages/error', {
    heading: 'Page not Found (404)',
    text: 'Resources you are looking do not exist!',
  });
};

export default notFoundMiddleware;
