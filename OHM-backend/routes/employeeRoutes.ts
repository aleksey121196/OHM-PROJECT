import express, { Router } from 'express';
import { login } from '../controllers/employeeControllers';
import { authenticateJWT } from '../Middleware/auth.middleware';
import { addEmployee } from '../controllers/employeeControllers';

const router = express.Router();

router.post('/login', login);

router.get('/protected', authenticateJWT, (req,res) =>{
    res.status(200).json({
        message: 'protected route accessed',
         user: (req as any).user
        });
});


router.post('/add', addEmployee);


export default router;
