import { clerkMiddleware, getAuth } from '@clerk/express';
import type { Request, Response, NextFunction } from 'express';

export const clerkAuth = clerkMiddleware();

export function requireClerkAuth(req: Request, res: Response, next: NextFunction) {
  const auth = getAuth(req);
  if (!auth?.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}
