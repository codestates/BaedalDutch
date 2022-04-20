import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

module.exports = {
  generateToken: (data: object[]) => {
    return jwt.sign(data, process.env.ACCESS_SECRET, { expiresIn: '1h' });
  },
  sendAccessToken: (res: Response, accessToken: string) => {
    return res.cookie('jwt', accessToken, {
      httpOnly: true,
    });
  },
  isAuthorized: (req: Request) => {
    const token: string = req.cookies.jwt;
    if (!token) console.log('not token');
    else {
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_SECRET,
        (err, decoded) => {
          if (err) console.log(err);
          else {
            return { userInfo: decoded };
          }
        },
      );
    }
  },
};
