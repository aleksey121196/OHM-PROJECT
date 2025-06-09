import express from 'express';
import { createMenu } from '../controllers/mealMenuControllers';
import { getMenu } from '../controllers/mealMenuControllers';
import { authenticateJWT } from '../Middleware/auth.middleware';


const router = express.Router();

router.get('/', authenticateJWT, getMenu);
router.post('/', authenticateJWT, createMenu);

export default router;