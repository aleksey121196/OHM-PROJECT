import express from 'express';
import { AddWorkPlan, getMyTasks, updateTaskStatus } from '../controllers/WorkPlanController';
import { authenticateJWT } from '../Middleware/auth.middleware';

const router = express.Router();

router.post('/', authenticateJWT, AddWorkPlan);

router.get('/mytasks', authenticateJWT, getMyTasks);

router.patch('/tasks/:taskId/status', authenticateJWT, updateTaskStatus);

export default router;
