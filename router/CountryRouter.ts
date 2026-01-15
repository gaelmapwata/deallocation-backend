import { Router } from 'express';
import AuthMiddleware from '../middleware/AuthMiddleware';
import CountryController from '../controllers/CountryController';

const router = Router();

router.post(
  '/',
  [
    AuthMiddleware.shouldBeLogged,
  ],
  CountryController.store as any,
);

router.get(
  '/',
  [
    AuthMiddleware.shouldBeLogged,
  ],
  CountryController.index,
);

export default router;
