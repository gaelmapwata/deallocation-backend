/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import AuthMiddleware from '../middleware/AuthMiddleware';
import RateLimiteMiddleware from '../middleware/RateLimiteMiddleware';

const router = Router();

router.post('/signin', [RateLimiteMiddleware.rateLimit], AuthController.signin as any);
router.post(
  '/check-otp',
  [AuthMiddleware.verifyPasswordToken, RateLimiteMiddleware.rateLimit],
  AuthController.checkOtp,
);
router.get('/user', [AuthMiddleware.shouldBeLogged], AuthController.getCurrentUser);
router.post('/logout', [AuthMiddleware.shouldBeLogged], AuthController.logout);
// eslint-disable-next-line max-len
// router.post('/change-password', [AuthMiddleware.shouldBeLogged], AuthController.changePassword as any);

export default router;
