import { Router } from 'express';
import AuthMiddleware from '../middleware/AuthMiddleware';
import PartnerDetailController from '../controllers/PartnerDetailController';
// import Permission from '../models/Permission';

const router = Router();

router.post(
  '/',
  [
    AuthMiddleware.shouldBeLogged,
  ],
  PartnerDetailController.store as any,
);

router.get(
  '/',
  [
    AuthMiddleware.shouldBeLogged,
  ],
  PartnerDetailController.index,
);

router.get(
  '/:id',
  [
    AuthMiddleware.shouldBeLogged,
  ],
  PartnerDetailController.show,
);

router.put(
  '/:id',
  [
    AuthMiddleware.shouldBeLogged,
  ],
  PartnerDetailController.update as any,
);

router.delete(
  '/:id',
  [
    AuthMiddleware.shouldBeLogged,
  ],
  PartnerDetailController.delete,
);

export default router;
