import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global{
  namespace Express{
    interface Request{
      user?: any;
    }
  }
}

// SECRET JWT (כפי שהגדרת ב־.env)
const JWT_SECRET = process.env.JWT_SECRET as string;

// Middleware לאימות JWT
export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    res.status(401).json({ message: 'Access denied: No token provided' });
    return;
  }

  const token = authHeader && authHeader.split(' ')[1];

  if (!token){
    res.status(401).json({message:'Access denide'});
    return;
  } 

  try{
    const user = jwt.verify(token, JWT_SECRET);
    (req as any).user = user;
    next();
  }catch(error){
    res.status(403).json({message: 'Invalid token'});
  }
}