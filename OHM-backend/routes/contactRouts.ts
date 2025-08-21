import express from 'express';
import { addContactData, getBusinessRequests } from '../controllers/contactControllers';

const router = express.Router();

router.post('/', addContactData);
router.get('/', getBusinessRequests);

export default router;
