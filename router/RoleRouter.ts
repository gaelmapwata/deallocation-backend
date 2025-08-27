/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import AuthMiddleware from '../middleware/AuthMiddleware';
import RoleController from '../controllers/RoleController';
import Permission from '../models/Permission';

const router = Router();

router.get(
  '/',
  [
    AuthMiddleware.shouldBeLogged,
    AuthMiddleware.shouldHavePermission(Permission.ROLE.READ),
  ],
  RoleController.index,
);
router.post(
  '/',
  [
    AuthMiddleware.shouldBeLogged,
    AuthMiddleware.shouldHavePermission(Permission.ROLE.CREATE),
  ],
  RoleController.store as any,
);
router.post(
  '/:id/add-permissions',
  [
    AuthMiddleware.shouldBeLogged,
    AuthMiddleware.shouldHavePermission(Permission.ROLE.UPDATE),
  ],
  RoleController.addPermissions as any,
);
router.post(
  '/:id/update-permissions',
  [
    AuthMiddleware.shouldBeLogged,
    AuthMiddleware.shouldHavePermission(Permission.ROLE.UPDATE),
  ],
  RoleController.updatePermissions as any,
);
router.get(
  '/:id',
  [
    AuthMiddleware.shouldBeLogged,
    AuthMiddleware.shouldHavePermission(Permission.ROLE.READ),
  ],
  RoleController.show,
);
router.put(
  '/:id',
  [
    AuthMiddleware.shouldBeLogged,
    AuthMiddleware.shouldHavePermission(Permission.ROLE.UPDATE),
  ],
  RoleController.update as any,
);
router.delete(
  '/:id',
  [
    AuthMiddleware.shouldBeLogged,
    AuthMiddleware.shouldHavePermission(Permission.ROLE.DELETE),
  ],
  RoleController.delete,
);

export default router;
