import express from 'express';
import { addTransportation, getAllTransportations, getTodayTransportations } from '../controllers/transportationControllers';
import { authenticateJWT } from '../Middleware/auth.middleware';

const router = express.Router();

router.post('/add', authenticateJWT, addTransportation);
router.get('/My', authenticateJWT, getTodayTransportations); // fetch only current user
router.get('/all', getAllTransportations); // optional: fetch all for admin

export default router;
