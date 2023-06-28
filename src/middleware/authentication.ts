import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key';

const generateToken = (id: any, email: any, role: 'admin' | 'user') => {
  const token = jwt.sign({ id, email, role }, secretKey, { expiresIn: '1d' });
  return token;
};

const authMiddleware = (requiredRole: 'admin' | 'user') => {
  return (req: any, res: any, next: any) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
      }

      const decodedToken = jwt.verify(token, secretKey) as { id: any; role: 'admin' | 'user' };

      if (requiredRole && decodedToken.role !== requiredRole) {
        return res.status(403).json({ message: `Unauthorized. ${requiredRole} role required.` });
      }

      req.user = { id: decodedToken.id, role: decodedToken.role };

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid authentication token' });
    }
  };
};

export { generateToken, authMiddleware };

