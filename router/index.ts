// TODO: Should fix this "any" issue
/* eslint-disable @typescript-eslint/no-explicit-any */

import express, { Request, Response } from 'express';
import AuthMiddleware from '../middleware/AuthMiddleware';
import AuthRouter from './AuthRouter';
import TransactionRouter from './TransactionRouter';
import UserRouter from './UserRouter';
import RoleRouter from './RoleRouter';
import RessourceRouter from './RessourceRouter';
import PartnerDetailRouter from './PartnerDetailRouter';
import PartnerDetailAccountRouter from './PartnerDetailAccountRouter';
import CountryRouter from './CountryRouter';
import BankRouter from './BankRouter';
import BranchRouter from './BranchRouter';
import TypeUserRouter from './TypeUserRouter';

const router = express.Router();

router.get('/', (_: Request, res: Response) => {
  res.send('HELLO WORD !!');
});

router.use('/auth', AuthRouter);
router.use('/transactions', TransactionRouter);
router.use('/users', UserRouter);
router.use('/roles', RoleRouter);
router.use('/ressources', RessourceRouter);
router.use('/partner-details', PartnerDetailRouter);
router.use('/partner-detail-accounts', PartnerDetailAccountRouter);
router.use('/countries', CountryRouter);
router.use('/banks', BankRouter);
router.use('/branches', BranchRouter);
router.use('/type-users', TypeUserRouter);

// ----------

router.get('/protected', [AuthMiddleware.shouldBeLogged], (_: Request, res: Response) => {
  res.send('You have access to protected content !! ');
});

export default router;
