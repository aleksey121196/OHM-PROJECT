import { Request, Response } from 'express';
import { ContactRequest } from '../models/ContactRequest';

export const addContactData = async (req: Request, res: Response) => {
  try {
      const newcontactrequest = new ContactRequest(req.body);
      await newcontactrequest.save();
      res.status(201).json(newcontactrequest);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add contact request' });
    }
};

export const getBusinessRequests = async (req: Request, res:Response) => {
    try {
      const getAllBusinessRequests = await ContactRequest.find();
      res.status(200).json(getAllBusinessRequests);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch Contact Requests', error });
    }
};
