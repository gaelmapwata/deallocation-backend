import { Router } from 'express';
import ClientAuthMiddleware from '../middleware/ClientAuthMiddleware';
import AuthMiddleware from '../middleware/AuthMiddleware';
import TransactionController from '../controllers/TransactionController';
import Permission from '../models/Permission';

const router = Router();

router.post(
  '/',
  [
    ClientAuthMiddleware.shouldBeLogged,
  ],
  TransactionController.storeTransaction as any,
);

router.get(
  '/',
  [
    AuthMiddleware.shouldBeLogged,
    AuthMiddleware.shouldHaveOneOfPermissions(Permission.TRANSACTION.READ),
  ],
  TransactionController.index,
);

export default router;
