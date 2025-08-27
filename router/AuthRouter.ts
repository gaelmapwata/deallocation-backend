/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import AuthMiddleware from '../middleware/AuthMiddleware';
import RateLimiteMiddleware from '../middleware/RateLimiteMiddleware';

const router = Router();

router.post('/signin', [RateLimiteMiddleware.rateLimit], AuthController.signin as any);
router.get('/user', [AuthMiddleware.shouldBeLogged], AuthController.getCurrentUser);
router.post('/logout', [AuthMiddleware.shouldBeLogged], AuthController.logout);
router.post('/change-password', [AuthMiddleware.shouldBeLogged], AuthController.changePassword as any);

export default router;
