import { Request, Response } from 'express';
import { query } from '../db/db';

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const sql = 'SELECT *
