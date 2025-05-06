import express from 'express';
import { addTransportation,getAllTransportations } from '../controllers/transportationControllers';

const router = express.Router();

router.post('/', addTransportation);
router.get('/', getAllTransportations);

export default router;
