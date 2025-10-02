import { Router } from 'express';
import ClientAuthController from '../controllers/ClientAuthController';
import ClientAuthMiddleware from '../middleware/ClientAuthMiddleware';
import RateLimiteMiddleware from '../middleware/RateLimiteMiddleware';

const router = Router();

router.post('/signin', [RateLimiteMiddleware.rateLimit], ClientAuthController.signin as any);
router.get('/client', [ClientAuthMiddleware.shouldBeLogged], ClientAuthController.getCurrentClient);
router.post('/change-password', [ClientAuthMiddleware.shouldBeLogged], ClientAuthController.changePassword as any);

export default router;
