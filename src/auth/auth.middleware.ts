import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies['token'];
  if (!token) return next(); // No token means unauthenticated but continue the request

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    if (!decoded) {
        return res.status(401).send('Unauthorized access');
      }
    req.user = (decoded as Record<string, unknown>).user as typeof req.user;
    next();
  } catch (err) {
    res.clearCookie('token'); // Clear invalid token
    return res.status(403).send('Invalid or expired token.');
  }
}
