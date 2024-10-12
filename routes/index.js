import { Router } from 'express';
import inventoryRoutes from './inventoryRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import { getAboutView, getIndexView } from '../controllers/mainController.js';

const router = Router();

router.get('/', getIndexView);
router.get('/about', getAboutView);
router.use('/inventory', inventoryRoutes);
router.use('/categories', categoryRoutes);

export default router;
