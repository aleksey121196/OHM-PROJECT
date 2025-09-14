import express from 'express';
import { AddNewFoodOrder, getUserOrderHistory, getMealOrders, getUserTodayOrder } from '../controllers/foodOrderControllers';
import { authenticateJWT } from '../Middleware/auth.middleware';


const router = express.Router();

router.post('/', AddNewFoodOrder);
router.get('/history/:userId', authenticateJWT, getUserOrderHistory);
router.get('/meal-orders', authenticateJWT, getMealOrders);
router.get('/today/:userId', authenticateJWT, getUserTodayOrder);


export default router;