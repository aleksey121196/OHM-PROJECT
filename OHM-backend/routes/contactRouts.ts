// routes/contactRoutes.ts
import express from 'express';
import { addContactData } from '../controllers/contactControllers';

const router = express.Router();

router.post('/', addContactData);

export default router;
