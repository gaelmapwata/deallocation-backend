import { Request as ExpressRequest } from 'express';
import User from '../models/User';
import Client from '../models/Client';

export type Request = ExpressRequest & {
  userId?: number | null,
  clientId?: number | null,
  user?: User | null,
  client?: Client | null,
  passwordAuthData?: {
    userId?: number | null,
    user?: User | null,
  }
}
