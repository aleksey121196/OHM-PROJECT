import express from 'express';
import { AddNewFoodOrder, getUserOrderHistory } from '../controllers/foodOrderControllers';
import { authenticateJWT } from '../Middleware/auth.middleware';


const router = express.Router();

router.post('/', AddNewFoodOrder);
router.get('/history/:userId', authenticateJWT, getUserOrderHistory);
//router.get('/businessMeetings',authenticateJWT, getBusinesMeetingsByName);


export default router;