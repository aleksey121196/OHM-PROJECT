import { Request, Response } from "express";
import { BusinessMeetings } from "../models/BusinessMeetings";

export const AddNewBusinessMeeting = async (req: Request, res: Response) => {
  try {
    const newbusinessmeeting = new BusinessMeetings(req.body);
    await newbusinessmeeting.save();
    res.status(201).json(newbusinessmeeting);
  } catch (error) {
    res.status(500).json({ error: 'Faild to add new Business Meeting. ' });
  }
};

export const getBusinesMeetingsByName = async (req: Request, res: Response) => {
  try {
    const managername = req.user.FullName;
    const meetings = await BusinessMeetings.find({ ManagerName: managername }); // ✅ FIXED
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Busines Meeting', error });
  }
};