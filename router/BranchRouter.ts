import { Router } from 'express';
import AuthMiddleware from '../middleware/AuthMiddleware';
import BranchController from '../controllers/BranchController';

const router = Router();

router.post(
  '/',
  [
    AuthMiddleware.shouldBeLogged,
  ],
  BranchController.store as any,
);

router.get(
  '/by-logged-bank',
  [AuthMiddleware.shouldBeLogged],
  BranchController.getByLoggedBank as any,
);

router.get(
  '/all-by-logged-bank',
  [AuthMiddleware.shouldBeLogged],
  BranchController.getAllByLoggedBank as any,
);

router.post(
  '/branches',
  [AuthMiddleware.shouldBeLogged],
  BranchController.store as any,
);

router.put(
  '/:id',
  [AuthMiddleware.shouldBeLogged],
  BranchController.update as any,
);

router.delete(
  '/:id',
  [AuthMiddleware.shouldBeLogged],
  BranchController.delete,
);

export default router;
