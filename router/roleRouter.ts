/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import authJwt from '../middleware/authJwt';
import RoleController from '../controllers/RoleController';
import Permission from '../models/Permission';

const router = Router();

router.get(
  '/',
  [authJwt.shouldBeLogged, authJwt.shouldHavePermission(Permission.ROLE.READ)],
  RoleController.index,
);
router.post(
  '/',
  [authJwt.shouldBeLogged, authJwt.shouldHavePermission(Permission.ROLE.CREATE)],
  RoleController.store as any,
);
router.post(
  '/:id/add-permissions',
  [authJwt.shouldBeLogged, authJwt.shouldHavePermission(Permission.ROLE.UPDATE)],
  RoleController.addPermissions as any,
);
router.post(
  '/:id/update-permissions',
  [authJwt.shouldBeLogged, authJwt.shouldHavePermission(Permission.ROLE.UPDATE)],
  RoleController.updatePermissions as any,
);
router.get(
  '/:id',
  [authJwt.shouldBeLogged, authJwt.shouldHavePermission(Permission.ROLE.READ)],
  RoleController.show,
);
router.put(
  '/:id',
  [authJwt.shouldBeLogged, authJwt.shouldHavePermission(Permission.ROLE.UPDATE)],
  RoleController.update as any,
);
router.delete(
  '/:id',
  [authJwt.shouldBeLogged, authJwt.shouldHavePermission(Permission.ROLE.DELETE)],
  RoleController.delete,
);

export default router;
