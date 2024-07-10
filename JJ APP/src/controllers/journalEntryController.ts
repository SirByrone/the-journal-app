import { Request, Response } from 'express';
import JournalEntry from '../models/journalEntry';

export const createEntry = async (req: Request, res: Response) => {
  const { title, content, category, date } = req.body;
  const userId = req.user.id;
  try {
    const newEntry = new JournalEntry({ title, content, category, date, user: userId });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getEntries = async (req: Request, res: Response) => {
  const userId = req.user.id;
  try
