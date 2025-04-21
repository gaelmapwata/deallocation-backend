// TODO: Should fix this "any" issue
/* eslint-disable @typescript-eslint/no-explicit-any */

import express, { Request, Response } from 'express';
import authJwt from '../middleware/authJwt';
import Permission from '../models/Permission';
import RessourceController from '../controllers/RessourceController';
import authRouter from './authRouter';
import userRouter from './userRouter';
import roleRouter from './roleRouter';

const router = express.Router();

router.get('/', (_: Request, res: Response) => {
  res.send('HELLO WORD !!');
});

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/roles', roleRouter);

/**
 * ressources routes
 */

router.get(
  '/ressources',
  [authJwt.shouldBeLogged, authJwt.shouldHavePermission(Permission.RESSOURCE.READ)],
  RessourceController.index as any,
);

// ----------

router.get('/protected', [authJwt.shouldBeLogged], (_: Request, res: Response) => {
  res.send('You have access to protected content !! ');
});

export default router;
