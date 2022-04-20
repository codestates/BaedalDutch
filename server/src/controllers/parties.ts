import { Request, Response } from 'express';

const partiesInfo = async (req: Request, res: Response) => {
  res.end();
};
const createParty = async (req: Request, res: Response) => {
  res.end();
};
const delParty = async (req: Request, res: Response) => {};
const updateParty = async (req: Request, res: Response) => {};

export { partiesInfo, createParty, delParty, updateParty };
