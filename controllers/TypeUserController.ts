import { Request, Response } from 'express';
import { checkSchema, validationResult } from 'express-validator';
import TypeUser from '../models/TypeUser';
import typeUserValidator from '../validators/typeUserValidator';

export default {
  index: async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const offset = (page - 1) * limit;

      const limitQuery = limit === -1 ? {} : { limit };

      const typeUsersAndCount = await TypeUser.findAndCountAll({
        ...limitQuery,
        offset,
        order: ['name'],
      });

      const typeUsersSize = typeUsersAndCount.count;
      const totalPages = Math.ceil(typeUsersSize / limit);

      res.status(200).json({
        data: typeUsersAndCount.rows,
        lastPage: totalPages,
        currentPage: page,
        limit,
        total: typeUsersSize,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getListTypeUser: async (req: Request, res: Response) => {
    try {
      const typesUsers = await TypeUser.findAll();

      return res.status(200).json(typesUsers);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  store: [
    checkSchema(typeUserValidator.storeSchema),
    async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ msg: errors.array() });
        }
        const typeUser = await TypeUser.create(req.body);
        res.status(201).json(typeUser);
      } catch (error) {
        res.status(500).json(error);
      }
    },
  ],
  show: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const country = await TypeUser.findByPk(id);
      res.status(200).json(country);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: [
    checkSchema(typeUserValidator.updateSchema),
    async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ msg: errors.array() });
        }

        const { id } = req.params as any;
        await TypeUser.update(
          req.body,
          {
            where: {
              id,
            },
            fields: TypeUser.fillable,
          },
        );

        const newTypeUser = await TypeUser.findByPk(id);
        res.status(200).json(newTypeUser);
      } catch (error) {
        res.status(500).json(error);
      }
    },
  ],
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const typeUser = await TypeUser.findByPk(id);

      if (typeUser) {
        typeUser.destroy();
      }
      res.status(204).json({});
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
