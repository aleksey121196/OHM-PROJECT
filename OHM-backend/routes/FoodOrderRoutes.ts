import express from 'express';
import { AddNewFoodOrder } from '../controllers/foodOrderControllers';
import { authenticateJWT } from '../Middleware/auth.middleware';


const router = express.Router();

router.post('/', AddNewFoodOrder);
//router.get('/businessMeetings',authenticateJWT, getBusinesMeetingsByName);


export default router;