import express from 'express';
import { addAbsence,getAllAbsences } from '../controllers/absenceControllers';
const router = express.Router();

router.post('/', addAbsence);
router.get('/', getAllAbsences);

export default router;
