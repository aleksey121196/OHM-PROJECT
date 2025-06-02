import express from 'express';
import { AddWorkPlan, getMyTasks, updateTaskStatus } from '../controllers/WorkPlanController';
import { authenticateJWT } from '../Middleware/auth.middleware';

const router = express.Router();

// Add a new work plan (protected route)
router.post('/', authenticateJWT, AddWorkPlan);

// Get tasks assigned to the authenticated user
router.get('/mytasks', authenticateJWT, getMyTasks);

// Update status of a specific task assigned to the authenticated user
// taskId comes from URL param now
router.patch('/tasks/:taskId/status', authenticateJWT, updateTaskStatus);

export default router;
