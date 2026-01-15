import { Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import User from '../models/User';
import UserValidators from '../validators/UserValidator';
import BcryptUtil from '../utils/BcryptUtil';
import { handleExpressValidators } from '../utils/ExpressUtil';
import Role from '../models/Role';
import BranchService from '../services/BranchService';
import LogHelper, { userLogIdentifier } from '../utils/logHelper';

export default {
  index: async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const offset = (page - 1) * limit;

      const limitQuery = limit === -1 ? {} : { limit };

      const usersAndCount = await User.findAndCountAll({
        ...limitQuery,
        offset,
        order: ['email'],
        attributes: { exclude: ['password'] },
        include: [Role],
      });

      const usersSize = usersAndCount.count;
      const totalPages = Math.ceil(usersSize / limit);

      return res.status(200).json({
        data: usersAndCount.rows,
        lastPage: totalPages,
        currentPage: page,
        limit,
        total: usersSize,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  listUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.findAll();

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  store: [
    checkSchema(UserValidators.storeSchema),
    async (req: Request, res: Response) => {
      try {
        if (handleExpressValidators(req, res)) {
          return null;
        }
        let hashedPassword = null;
        const isPartner = Boolean(req.body.password);
        const userbelongsToBankOfBranch = await BranchService
          .userBelongsToBankOfBranch((req as any).user, req.body.branchId);

        if (!userbelongsToBankOfBranch) {
          return res.status(400).json({ msg: 'You should belong to the same bank as the branch' });
        }

        if (isPartner) {
          hashedPassword = await BcryptUtil.hashPassword(req.body.password);
        }
        const user = await User.create({
          ...req.body,
          password: hashedPassword,
          isPartner,
          createdByUserId: (req as any).userId,
          validationAskedByUserId: (req as any).userId,
        }, {
          fields: User.fillable.concat('createdByUserId', 'validationAskedByUserId'),
        });

        const { roleId } = (req.body as any);
        if (roleId) {
          await user.$add('roles', roleId as number);
          await user.reload({ include: [Role] });
        }

        const userRole = user.roles && user.roles.length
          ? user.roles[0].name
          : 'No role';

        LogHelper.info(`User | new user (${req.body.email}) "${userRole}" created by user (${userLogIdentifier(req)})`, '');

        res.status(201).json(user);
      } catch (error) {
        return res.status(500).json(error);
      }
    },
  ],

  show: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] },
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  update: [
    checkSchema(UserValidators.updateSchema),
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
        await User.update(
          req.body,
          {
            where: {
              id,
            },
            fields: User.fillable,
          },
        );

        const newUser = await User.findByPk(id);

        const { roles } = req.body;
        if (roles && newUser) {
          await newUser.$set('roles', roles);
        }

        return res.status(200).json(newUser);
      } catch (error) {
        return res.status(500).json(error);
      }
    },
  ],

  addRoles: [
    checkSchema(UserValidators.addRolesSchema),
    async (req: Request, res: Response) => {
      try {
        if (handleExpressValidators(req, res)) {
          return null;
        }

        const user = await User.findByPk(req.params.id);
        if (!user) {
          return res.status(404).json({ message: 'L\'utilisateur n\'a pas été retrouver' });
        }

        const { roles } = req.body;
        await user.$add('roles', roles);

        return res.status(201).json(user);
      } catch (error) {
        return res.status(500).json(error);
      }
    },
  ],

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await User.destroy({
        where: { id },
      });
      return res.status(204).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  lockUser: [
    async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        await User.update(
          { locked: true },
          { where: { id } },
        );

        const user = await User.findByPk(id, {
          attributes: { exclude: ['password'] },
        });

        return res.status(200).json(user);
      } catch (error) {
        return res.status(500).json(error);
      }
    },
  ],

  unlockUser: [
    async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        await User.update(
          { locked: false },
          { where: { id } },
        );

        const user = await User.findByPk(id, {
          attributes: { exclude: ['password'] },
        });

        return res.status(200).json(user);
      } catch (error) {
        return res.status(500).json(error);
      }
    },
  ],
  validate: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      if (user.validationAskedByUserId === (req as any).userId) {
        return res.status(400).json({ msg: 'You cannot validate accounts initiate by your self' });
      }

      await User.update({
        validatedByUserId: (req as any).userId,
      }, {
        where: { id },
      });

      LogHelper.info(`User | user (${user?.email}) validated by user (${userLogIdentifier(req)})`, '');

      res.status(204).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
