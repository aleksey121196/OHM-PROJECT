import { Request, Response } from 'express';
import Absences from '../models/Absences';

export const addAbsence = async (req: Request, res: Response) => {
  try {
    const newabsence = new Absences(req.body);
    await newabsence.save();
    res.status(201).json(newabsence);
  } catch (error) {
    res.status(500).json({ error: 'Failed to report absence' });
  }
};


export const getAllAbsences = async (_req: Request, res: Response) => {
  try {
    const newabsences = await Absences.find();
    res.status(200).json(newabsences);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching absences' });
  }
};
