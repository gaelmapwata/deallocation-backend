import { Router } from 'express';
import AuthMiddleware from '../middleware/AuthMiddleware';
import PartnerDetailAccountController from '../controllers/PartnerDetailAccountController';

const router = Router();

router.post(
  '/',
  [
    AuthMiddleware.shouldBeLogged,
  ],
  PartnerDetailAccountController.store as any,
);
router.get(
  '/',
  [
    AuthMiddleware.shouldBeLogged,
  ],
  PartnerDetailAccountController.index,
);
router.get(
  '/:id',
  [
    AuthMiddleware.shouldBeLogged,
  ],
  PartnerDetailAccountController.show,
);
router.put(
  '/:id',
  [
    AuthMiddleware.shouldBeLogged,
  ],
  PartnerDetailAccountController.update as any,
);
router.delete(
  '/:id',
  [
    AuthMiddleware.shouldBeLogged,
  ],
  PartnerDetailAccountController.delete,
);

export default router;
