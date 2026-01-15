import { Router } from 'express';
import AuthMiddleware from '../middleware/AuthMiddleware';
import TypeUserController from '../controllers/TypeUserController';

const router = Router();

router.post(
  '/',
  [
    AuthMiddleware.shouldBeLogged,
  ],
  TypeUserController.store as any,
);

router.get(
  '/',
  [
    AuthMiddleware.shouldBeLogged,
  ],
  TypeUserController.index,
);
router.get(
  '/list-type-users',
  [
    AuthMiddleware.shouldBeLogged,
  ],
  TypeUserController.getListTypeUser,
);

export default router;
