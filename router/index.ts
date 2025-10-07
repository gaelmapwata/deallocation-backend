// TODO: Should fix this "any" issue
/* eslint-disable @typescript-eslint/no-explicit-any */

import express, { Request, Response } from 'express';
import AuthMiddleware from '../middleware/AuthMiddleware';
import AuthRouter from './AuthRouter';
import ClientAuth from './ClientAuthRouter';
import ClientRouter from './ClientRouter';
import TransactionRouter from './TransactionRouter';
import UserRouter from './UserRouter';
import RoleRouter from './RoleRouter';
import RessourceRouter from './RessourceRouter';

const router = express.Router();

router.get('/', (_: Request, res: Response) => {
  res.send('HELLO WORD !!');
});

router.use('/auth', AuthRouter);
router.use('/client-auth', ClientAuth);
router.use('/clients', ClientRouter);
router.use('/transactions', TransactionRouter);
router.use('/users', UserRouter);
router.use('/roles', RoleRouter);
router.use('/ressources', RessourceRouter);

// ----------

router.get('/protected', [AuthMiddleware.shouldBeLogged], (_: Request, res: Response) => {
  res.send('You have access to protected content !! ');
});

export default router;
