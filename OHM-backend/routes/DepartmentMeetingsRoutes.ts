import express from 'express';
import { AddNewDepartmentMeeting } from '../controllers/DepartmentMeetingsControllers';

const router = express.Router();

router.post('/', AddNewDepartmentMeeting); 

export default router;