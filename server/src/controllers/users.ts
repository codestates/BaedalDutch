import { Request, Response } from 'express';

const signup = async (req: Request, res: Response) => {
  res.end();
};
const signin = async (req: Request, res: Response) => {
  res.end();
};
const signout = async (req: Request, res: Response) => {};
const delUser = async (req: Request, res: Response) => {};
const mypage = async (req: Request, res: Response) => {};

export { signup, signin, signout, delUser, mypage };
