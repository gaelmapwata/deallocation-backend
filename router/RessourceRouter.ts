/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import authJwt from '../middleware/authJwt';
import RessourceController from '../controllers/RessourceController';
import Permission from '../models/Permission';

const router = Router();

router.get(
  '/',
  [authJwt.shouldBeLogged, authJwt.shouldHavePermission(Permission.RESSOURCE.READ)],
  RessourceController.index as any,
);

export default router;
