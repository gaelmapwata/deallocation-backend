/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import AuthMiddleware from '../middleware/AuthMiddleware';
import UserController from '../controllers/UserController';
import Permission from '../models/Permission';

const router = Router();

router.get(
  '/',
  [
    AuthMiddleware.shouldBeLogged,
    AuthMiddleware.shouldHavePermission(Permission.USER.READ),
  ],
  UserController.index,
);
router.post(
  '/',
  [
    AuthMiddleware.shouldBeLogged,
    AuthMiddleware.shouldHavePermission(Permission.USER.CREATE),
  ],
  UserController.store as any,
);
router.get(
  '/:id',
  [
    AuthMiddleware.shouldBeLogged,
    AuthMiddleware.shouldHavePermissionOrParamIdBeLoggedUserId(Permission.USER.READ),
  ],
  UserController.show,
);
router.put(
  '/:id',
  [
    AuthMiddleware.shouldBeLogged,
    AuthMiddleware.shouldHavePermissionOrParamIdBeLoggedUserId(Permission.USER.UPDATE),
  ],
  UserController.update as any,
);
router.delete(
  '/:id',
  [
    AuthMiddleware.shouldBeLogged,
    AuthMiddleware.shouldHavePermission(Permission.USER.DELETE),
  ],
  UserController.delete,
);
router.put(
  '/:id/lock',
  [
    AuthMiddleware.shouldBeLogged,
    AuthMiddleware.shouldHavePermission(Permission.USER.UPDATE),
  ],
  UserController.lockUser,
);
router.put(
  '/:id/unlock',
  [
    AuthMiddleware.shouldBeLogged,
    AuthMiddleware.shouldHavePermission(Permission.USER.UPDATE),
  ],
  UserController.unlockUser,
);

export default router;
