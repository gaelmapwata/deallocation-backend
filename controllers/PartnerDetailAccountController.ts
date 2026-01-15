import { Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import PartnerDetailAccount from '../models/PartnerDetailAccount';
import Currency from '../models/Currency';
import PartnerDetail from '../models/PartnerDetail';
import PartnerDetailAccountValidator from '../validators/PartnerDetailAccountValidator';
import { handleExpressValidators } from '../utils/ExpressUtil';

export default {
  index: async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const offset = (page - 1) * limit;

      const limitQuery = limit === -1 ? {} : { limit };

      const PartnerDetailAccountsAndCount = await PartnerDetailAccount.findAndCountAll({
        ...limitQuery,
        offset,
        order: ['accountNumber'],
        include: [Currency, PartnerDetail],
      });

      const PartnerDetailAccountsSize = PartnerDetailAccountsAndCount.count;
      const totalPages = Math.ceil(PartnerDetailAccountsSize / limit);

      return res.status(200).json({
        data: PartnerDetailAccountsAndCount.rows,
        lastPage: totalPages,
        currentPage: page,
        limit,
        total: PartnerDetailAccountsSize,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  store: [
    checkSchema(PartnerDetailAccountValidator.storeSchema),
    async (req: Request, res: Response) => {
      try {
        if (handleExpressValidators(req, res)) {
          return null;
        }

        const partnerDetailAccount = await PartnerDetailAccount.create({
          ...req.body,
        }, {
          fields: PartnerDetailAccount.fillable,
        });

        return res.status(201).json(partnerDetailAccount);
      } catch (error) {
        return res.status(500).json(error);
      }
    },
  ],

  show: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const partnerDetailAccount = await PartnerDetailAccount.findByPk(id, {
        include: [Currency, PartnerDetail],
      });
      return res.status(200).json(partnerDetailAccount);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  update: [
    checkSchema(PartnerDetailAccountValidator.updateSchema),
    async (req: Request, res: Response) => {
      try {
        if (handleExpressValidators(req, res)) {
          return null;
        }

        const { id } = req.params;

        await PartnerDetailAccount.update(
          req.body,
          {
            where: {
              id,
            },
            fields: PartnerDetailAccount.fillable,
          },
        );

        const newPartnerDetailAccount = await PartnerDetailAccount.findByPk(id);
        return res.status(200).json(newPartnerDetailAccount);
      } catch (error) {
        return res.status(500).json(error);
      }
    },
  ],

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const partnerDetailAccount = await PartnerDetailAccount.destroy({
        where: { id },
      });
      return res.status(204).json(partnerDetailAccount);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
