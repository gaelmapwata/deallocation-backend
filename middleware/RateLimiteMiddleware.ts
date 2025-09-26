import { Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { Request } from '../types/ExpressOverride';

// Configure le rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limite chaque IP à 15 requêtes par fenêtre de 15 minutes
  message: 'Too many requests from your IP, please try again later.',
  headers: true,
});

export default {
  rateLimit: (req: Request, res: Response, next: NextFunction) => limiter(req, res, next),
};
