import { matchedData, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { selectItemsBySearch } from '../db/queries.js';

const getSearchResults = async (req, res, next) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      res.json(result.array());
    }

    const { item } = matchedData(req);
    const searchResult = await selectItemsBySearch(item);

    return res
      .status(StatusCodes.OK)
      .render('pages/searchResults', { searchTerm: item, searchResult });
  } catch (error) {
    return next(error);
  }
};

export { getSearchResults };
