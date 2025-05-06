import express from 'express';
import { addOverTime,getAllOverTime } from '../controllers/overTimeController';

const router = express.Router();

router.post('/', addOverTime);
router.get('/', getAllOverTime);

export default router;
