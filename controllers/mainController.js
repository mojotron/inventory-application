import { StatusCodes } from 'http-status-codes';

const getIndexView = (req, res) => {
  return res.status(StatusCodes.OK).render('pages/index');
};

const getAboutView = (req, res) => {
  return res.status(StatusCodes.OK).render('pages/about');
};

export { getIndexView, getAboutView };
