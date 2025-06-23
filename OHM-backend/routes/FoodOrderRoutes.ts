import express from 'express';
import { AddNewFoodOrder, getUserOrderHistory, getMealOrders } from '../controllers/foodOrderControllers';
import { authenticateJWT } from '../Middleware/auth.middleware';


const router = express.Router();

router.post('/', AddNewFoodOrder);
router.get('/history/:userId', authenticateJWT, getUserOrderHistory);
//router.get('/', getMealOrders); //No overload matches this call error! TO FIX!!!
//router.get('/businessMeetings',authenticateJWT, getBusinesMeetingsByName);


export default router;