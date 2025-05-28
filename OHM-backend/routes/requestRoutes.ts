import express from 'express';
import { addRequest,getRequestsByDepartment,respondToRequest,getRequestsByUser} from '../controllers/requestControllers';
import { authenticateJWT } from '../Middleware/auth.middleware';

const router = express.Router();

router.post('/', addRequest);
router.get('/department', authenticateJWT, getRequestsByDepartment);
router.put('/respond/:requestId', authenticateJWT, respondToRequest);
router.get('/myrequests', authenticateJWT,getRequestsByUser);



export default router;
