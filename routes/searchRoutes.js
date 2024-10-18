import { Router } from 'express';
import { getSearchResults } from '../controllers/searchController.js';
import searchValidator from '../validators/searchValidator.js';

const router = Router();

router.get('/', searchValidator, getSearchResults);

export default router;
