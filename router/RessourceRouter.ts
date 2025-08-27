/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import AuthMiddleware from '../middleware/AuthMiddleware';
import RessourceController from '../controllers/RessourceController';
import Permission from '../models/Permission';

const router = Router();

router.get(
  '/',
  [
    AuthMiddleware.shouldBeLogged,
    AuthMiddleware.shouldHavePermission(Permission.RESSOURCE.READ),
  ],
  RessourceController.index as any,
);

export default router;
