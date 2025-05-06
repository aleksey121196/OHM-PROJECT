import { Request, Response } from 'express';
import Transportation from '../models/Transportation';

export const addTransportation = async (req: Request, res: Response) => {
  try {
    const newRequest = new Transportation(req.body);
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save transportation data.' });
  }
};

export const getAllTransportations = async (req: Request, res: Response) => {
  try {
    const allRequests = await Transportation.find();
    res.json(allRequests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transportation data.' });
  }
};
