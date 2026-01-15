import { Router } from 'express';
import AuthMiddleware from '../middleware/AuthMiddleware';
import BankController from '../controllers/BankController';

const router = Router();

router.post(
  '/',
  [
    AuthMiddleware.shouldBeLogged,
  ],
  BankController.store as any,
);

export default router;
