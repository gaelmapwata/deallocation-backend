import { Router } from 'express';
import ClientController from '../controllers/ClientController';
import AuthMiddleware from '../middleware/AuthMiddleware';
import Permission from '../models/Permission';

const router = Router();

router.get(
  '/',
  [
    AuthMiddleware.shouldBeLogged,
    AuthMiddleware.shouldHaveOneOfPermissions(Permission.USER.READ),

  ],
  ClientController.index,
);

router.post(
  '/',
  [
    AuthMiddleware.shouldBeLogged,
    AuthMiddleware.shouldHaveOneOfPermissions(Permission.USER.CREATE),
  ],
  ClientController.store as any,
);

export default router;
