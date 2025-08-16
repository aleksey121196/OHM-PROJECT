import { Request, Response } from 'express';
import { Employee } from '../models/Employee';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const login = async (req: Request, res: Response): Promise<void> => {
  const { UserName, Password } = req.body;


  try {
    const employee = await Employee.findOne({
      UserName: { $regex: new RegExp(`^${UserName}$`, 'i') },
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
      { expiresIn: '1h' }
    );

    console.log("generated jwt: ", token);

    res.status(200).json({ token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};



export const addEmployee = async (req: Request, res: Response) => {
  try {
    const { Password, ...rest } = req.body;

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    const employee = new Employee({
      ...rest,
      Password: hashedPassword
    });

    await employee.save();
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ message: 'Failed to add employee', error });
  }
};

export const getMyProfile = async (req: Request, res: Response) => {
  try {
    // req.user will come from JWT middleware
    const userId = req.user?.Id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const employee = await Employee.findOne({ Id: userId }).select('-Password'); // exclude password
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


export const updateMyProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.Id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
   
    const { FullName, Email, Phone, Address, UserName, Password } = req.body;

    const Srounds = 10;
    const hashpassword = await bcrypt.hash(Password, Srounds);

    const updatedEmployee = await Employee.findOneAndUpdate(
      { Id: userId },
      { FullName, Email, Phone, Address, UserName, Password: hashpassword },
      { new: true, runValidators: true }
    ).select('-Password');

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
