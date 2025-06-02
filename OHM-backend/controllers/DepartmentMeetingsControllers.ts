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