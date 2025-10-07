import { Router } from 'express';
import ClientAuthMiddleware from '../middleware/ClientAuthMiddleware';
import AuthMiddleware from '../middleware/AuthMiddleware';
import TransactionController from '../controllers/TransactionController';

const router = Router();

router.post(
  '/',
  [
    ClientAuthMiddleware.shouldBeLogged,
  ],
  TransactionController.storeTransaction as any,
);


export default router;