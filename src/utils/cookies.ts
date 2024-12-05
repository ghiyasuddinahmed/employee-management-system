import { Response } from 'express';
import { config } from '../config/env';

export const setCookie = (res: Response, name: string, value: string, maxAge: number = 3600): void => {
  res.cookie(name, value, {
    httpOnly: true, 
    secure: config.NODE_ENV === 'production',
  });
};
