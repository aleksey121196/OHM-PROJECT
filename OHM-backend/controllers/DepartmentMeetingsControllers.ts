import { Request, Response } from "express";
import { DepartmentMeetings } from "../models/DepartmentMeeting";

export const AddNewDepartmentMeeting = async (req: Request, res: Response) =>{
    try{
        const newdepartmentmeeting = new DepartmentMeetings(req.body);
        await newdepartmentmeeting.save();
        res.status(201).json(newdepartmentmeeting);
    }catch (error) {
        res.status(500).json({error: 'Faild to add new Department Meeting. '});
    }
};

export const getMeetingsByDepartment = async (req: Request, res: Response) => {
  try {
    const  MeetingByDepartment= req.user.Department;
    const DepMeetings = await DepartmentMeetings.find({ Department: MeetingByDepartment }); // ✅ FIXED
    res.status(200).json(DepMeetings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Busines Meeting', error });
  }
};