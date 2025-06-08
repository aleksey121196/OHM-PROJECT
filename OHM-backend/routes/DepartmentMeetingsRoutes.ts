import express from 'express';
import { AddNewDepartmentMeeting, getMeetingsByDepartment } from '../controllers/DepartmentMeetingsControllers';
import { authenticateJWT } from '../Middleware/auth.middleware';

const router = express.Router();

router.post('/', AddNewDepartmentMeeting); 
router.get('/DepartmentMeetings',authenticateJWT, getMeetingsByDepartment);

export default router;