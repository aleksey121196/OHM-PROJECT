import express from 'express';
import { AddNewBusinessMeeting,getBusinesMeetingsByName } from '../controllers/BusinessMeetingsControllers';
import { authenticateJWT } from '../Middleware/auth.middleware';


const router = express.Router();

router.post('/', AddNewBusinessMeeting);
router.get('/businessMeetings',authenticateJWT, getBusinesMeetingsByName);


export default router;