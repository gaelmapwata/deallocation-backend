import { Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import Client from '../models/Client';
import ClientValidator from '../validators/ClientValidator';
import BcryptUtil from '../utils/BcryptUtil';
import { handleExpressValidators } from '../utils/ExpressUtil';

export default {
  index: async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const offset = (page - 1) * limit;

      const limitQuery = limit === -1 ? {} : { limit };

      const clientsAndCount = await Client.findAndCountAll({
        ...limitQuery,
        offset,
        order: ['email'],
        attributes: { exclude: ['password'] },
      });

      const clientsSize = clientsAndCount.count;
      const totalPages = Math.ceil(clientsSize / limit);

      return res.status(200).json({
        data: clientsAndCount.rows,
        lastPage: totalPages,
        currentPage: page,
        limit,
        total: clientsSize,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  store: [
    checkSchema(ClientValidator.storeSchema),
    async (req: Request, res: Response) => {
      try {
        if (handleExpressValidators(req, res)) {
          return null;
        }

        const hashedPassword = await BcryptUtil.hashPassword(req.body.password);
        const client = await Client.create({
          ...req.body,
          password: hashedPassword,
        }, {
          fields: Client.fillable,
        });

        return res.status(201).json(client);
      } catch (error) {
        return res.status(500).json(error);
      }
    },
  ],

  show: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const client = await Client.findByPk(id, {
        attributes: { exclude: ['password'] },
      });
      return res.status(200).json(client);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  update: [
    checkSchema(ClientValidator.updateSchema),
    async (req: Request, res: Response) => {
      try {
        if (handleExpressValidators(req, res)) {
          return null;
        }

        const { id } = req.params;

        if (req.body.password) {
          req.body.password = await BcryptUtil.hashPassword(req.body.password);
        } else {
          delete req.body.password;
        }
        await Client.update(
          req.body,
          {
            where: {
              id,
            },
            fields: Client.fillable,
          },
        );

        const newClient = await Client.findByPk(id);

        return res.status(200).json(newClient);
      } catch (error) {
        return res.status(500).json(error);
      }
    },
  ],

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const client = await Client.destroy({
        where: { id },
      });
      return res.status(204).json(client);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  lockClient: [
    async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        await Client.update(
          { locked: true },
          { where: { id } },
        );

        const client = await Client.findByPk(id, {
          attributes: { exclude: ['password'] },
        });

        return res.status(200).json(client);
      } catch (error) {
        return res.status(500).json(error);
      }
    },
  ],

  unlockClient: [
    async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        await Client.update(
          { locked: false },
          { where: { id } },
        );

        const client = await Client.findByPk(id, {
          attributes: { exclude: ['password'] },
        });

        return res.status(200).json(client);
      } catch (error) {
        return res.status(500).json(error);
      }
    },
  ],
};
