// routes/employeeRoutes.ts
import express, { Router } from 'express';
import { login } from '../controllers/employeeControllers';
import { authenticateJWT } from '../Middleware/auth.middleware';

const router = express.Router();

// קריאה לפונקציית login
router.post('/login', login);

router.get('/protected', authenticateJWT, (req,res) =>{
    res.status(200).json({
        message: 'protected route accessed',
         user: (req as any).user
        });
});

export default router;
