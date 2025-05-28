import { Request,Response } from "express";
import Requests from "../models/Requests";

export const addRequest = async (req: Request, res: Response) => {

  try {
    const newrequest = new Requests(req.body);
    await newrequest.save();
    res.status(201).json(newrequest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to report request' });
  }
};

export const getRequestsByDepartment = async (req: Request, res: Response) => {
  try {
    const managerDepartment = req.user.Department;
    const requests = await Requests.find({ Department: managerDepartment }); // ✅ FIXED
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests', error });
  }
};

export const respondToRequest = async (req: Request, res: Response) => {
  
  try {
    const { requestId } = req.params;
    const { text } = req.body;

    const responseData = {
      Text: text,
      Responder: req.user.FullName, // assuming your auth middleware adds this
      ResDate: new Date().toISOString()
    };

    const updatedRequest = await Requests.findByIdAndUpdate(
      requestId,
      { Response: responseData },
      { new: true }
    );

    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update request', error });
  }
};


// מניח שהמשתמש מזוהה ויש לך את userId מתוך הטוקן או הפרמטרים
export const getRequestsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;  // או req.params.userId אם אתה שולח בפרמטר
    const requests = await Requests.find({ userId });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch requests', error });
  }
};