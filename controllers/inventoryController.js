import { StatusCodes } from 'http-status-codes';

const getInventoryView = async (req, res, next) => {
  try {
    return res.status(StatusCodes.OK).render('pages/inventory');
  } catch (error) {
    return next(error);
  }
};

export { getInventoryView };
