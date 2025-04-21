// TODO: Should fix this "any" issue
/* eslint-disable @typescript-eslint/no-explicit-any */

import express, { Request, Response } from 'express';
import authJwt from '../middleware/authJwt';
import AuthRouter from './AuthRouter';
import UserRouter from './UserRouter';
import RoleRouter from './RoleRouter';
import RessourceRouter from './RessourceRouter';

const router = express.Router();

router.get('/', (_: Request, res: Response) => {
  res.send('HELLO WORD !!');
});

router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
router.use('/roles', RoleRouter);
router.use('/ressources', RessourceRouter);

// ----------

router.get('/protected', [authJwt.shouldBeLogged], (_: Request, res: Response) => {
  res.send('You have access to protected content !! ');
});

export default router;
