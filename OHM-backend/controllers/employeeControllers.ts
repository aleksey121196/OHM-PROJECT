import { Request, Response } from 'express';
import { Employee } from '../models/Employee';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const login = async (req: Request, res: Response): Promise<void> => {
  const { UserName, Password } = req.body;


  try {
    const employee = await Employee.findOne({
      UserName: { $regex: new RegExp(`^${UserName}$`, 'i') }, // לא רגיש לאותיות עבור UserName
    });

    console.log('Employee found:', employee);

    
    if (!employee || !(await bcrypt.compare(Password, employee.Password))) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }

    const token = jwt.sign(
      {
        FullName: employee.FullName,
        Email: employee.Email,
        Phone: employee.Phone,
        Address: employee.Address,
        Id: employee.Id,
        JobTitle: employee.JobTitle,
        EmploymentDate: employee.EmploymentDate,
        Department: employee.Department,
        Status: employee.Status,
        UserName: employee.UserName,
        Role: employee.Role,
        Password: employee.Password,
        EmployerName: employee.EmployerName,
      },
      JWT_SECRET,
      { expiresIn:'1h'}
    );

    console.log("generated jwt: ",token);

    res.status(200).json({ token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

