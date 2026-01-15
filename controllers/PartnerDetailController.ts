import { Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import PartnerDetail from '../models/PartnerDetail';
import User from '../models/User';
import PartnerDetailValidator from '../validators/PartnerDetailValidator';
import { handleExpressValidators } from '../utils/ExpressUtil';

export default {
  index: async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const offset = (page - 1) * limit;

      const limitQuery = limit === -1 ? {} : { limit };

      const partnerDetailsAndCount = await PartnerDetail.findAndCountAll({
        ...limitQuery,
        offset,
        order: ['partnerName'],
        include: [User],
      });

      const partnerDetailsSize = partnerDetailsAndCount.count;
      const totalPages = Math.ceil(partnerDetailsSize / limit);

      return res.status(200).json({
        data: partnerDetailsAndCount.rows,
        lastPage: totalPages,
        currentPage: page,
        limit,
        total: partnerDetailsSize,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  store: [
    checkSchema(PartnerDetailValidator.storeSchema),
    async (req: Request, res: Response) => {
      try {
        if (handleExpressValidators(req, res)) {
          return null;
        }

        const partnerDetail = await PartnerDetail.create({
          ...req.body,
        }, {
          fields: PartnerDetail.fillable,
        });

        return res.status(201).json(partnerDetail);
      } catch (error) {
        return res.status(500).json(error);
      }
    },
  ],

  show: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const partnerDetail = await PartnerDetail.findByPk(id, {
        include: [User],
      });
      return res.status(200).json(partnerDetail);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  update: [
    checkSchema(PartnerDetailValidator.updateSchema),
    async (req: Request, res: Response) => {
      try {
        if (handleExpressValidators(req, res)) {
          return null;
        }

        const { id } = req.params;

        await PartnerDetail.update(
          req.body,
          {
            where: {
              id,
            },
            fields: PartnerDetail.fillable,
          },
        );

        const newPartnerDetail = await PartnerDetail.findByPk(id);
        return res.status(200).json(newPartnerDetail);
      } catch (error) {
        return res.status(500).json(error);
      }
    },
  ],

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const partnerDetail = await PartnerDetail.destroy({
        where: { id },
      });
      return res.status(204).json(partnerDetail);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
