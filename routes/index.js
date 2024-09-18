import { Router } from 'express';
import inventoryRoutes from './inventoryRoutes.js';
import { getIndexView } from '../controllers/mainController.js';

const router = Router();

router.get('/', getIndexView);

router.use('/inventory', inventoryRoutes);

export default router;
