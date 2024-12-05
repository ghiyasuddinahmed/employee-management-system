import { Request } from 'express';

export function rolesGuard(req: Request, requiredRole: 'admin' | 'employee') {
  if (!req.user) {
    throw new Error('Access denied. Authentication required.');
  }

  if (req.user.role !== requiredRole) {
    throw new Error('Access denied. Insufficient permissions.');
  }
}
