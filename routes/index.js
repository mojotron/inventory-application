import { Router } from 'express';
import inventoryRoutes from './inventoryRoutes.js';
import { getAboutView, getIndexView } from '../controllers/mainController.js';

const router = Router();

router.get('/', getIndexView);
router.get('/about', getAboutView);

router.use('/inventory', inventoryRoutes);

export default router;
