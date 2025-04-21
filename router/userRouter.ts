/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import authJwt from '../middleware/authJwt';
import UserController from '../controllers/UserController';
import Permission from '../models/Permission';

const router = Router();

router.get(
  '/',
  [authJwt.shouldBeLogged, authJwt.shouldHavePermission(Permission.USER.READ)],
  UserController.index,
);
router.post(
  '/',
  [authJwt.shouldBeLogged, authJwt.shouldHavePermission(Permission.USER.CREATE)],
  UserController.store as any,
);
router.get(
  '/:id',
  [
    authJwt.shouldBeLogged,
    authJwt.shouldHavePermissionOrParamIdBeLoggedUserId(Permission.USER.READ),
  ],
  UserController.show,
);
router.put(
  '/:id',
  [
    authJwt.shouldBeLogged,
    authJwt.shouldHavePermissionOrParamIdBeLoggedUserId(Permission.USER.UPDATE),
  ],
  UserController.update as any,
);
router.delete(
  '/:id',
  [authJwt.shouldBeLogged, authJwt.shouldHavePermission(Permission.USER.DELETE)],
  UserController.delete,
);

export default router;
