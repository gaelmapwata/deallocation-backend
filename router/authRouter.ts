/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import authJwt from '../middleware/authJwt';
import rateLimiting from '../middleware/rateLimiting';

const router = Router();

router.post('/signin', [rateLimiting.rateLimitMiddleware], AuthController.signin as any);
router.get('/user', [authJwt.shouldBeLogged], AuthController.getCurrentUser);
router.post('/logout', [authJwt.shouldBeLogged], AuthController.logout);

export default router;
