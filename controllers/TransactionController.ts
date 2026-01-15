/* eslint-disable max-len */
import { Response } from 'express';
import { checkSchema, validationResult } from 'express-validator';
import {
  literal, Op, Sequelize, WhereOptions,
} from 'sequelize';
import XLSX from 'xlsx';
import TransactionValidator from '../validators/TransactionValidator';
import Transaction from '../models/Transaction';
import PartnerDetail from '../models/PartnerDetail';
import PartnerDetailAccount from '../models/PartnerDetailAccount';
import Currency from '../models/Currency';
import Country from '../models/Country';
import RetrieveAccountService from '../services/RetrieveAccountService';
import errorHandlerService from '../services/ErrorHandlerService';
import sequelize from '../sequelize-instance';
import {
  // eslint-disable-next-line max-len
  getTodayDate, getYesterdayDate, firstDayOfWeekDate, lastDayOfWeekDate, getFirstDayOfMonth, getLastDayOfMonth,
} from '../utils/data';
import LogHelper, { userLogIdentifier } from '../utils/logHelper';
import { Request } from '../types/ExpressOverride';
import TransactionFinacleService from '../services/TransactionFinacleService';

async function generateFilterAttributes(req: Request):Promise<any> {
  const filterAttributes: any = {};

  if (req.query.msisdn) {
    filterAttributes.msisdn = {
      [Op.like]: `%${req.query.msisdn}%`,
    };
  }
  if (req.query.currency) {
    filterAttributes.currency = req.query.currency;
  }
  if (['1', 'true'].includes(req.query.success as string)) {
    filterAttributes.success = true;
  }
  if (req.query.startDate || req.query.endDate) {
    filterAttributes[Op.and] = [
      req.query.startDate
        ? sequelize.where(
          sequelize.fn('DATE', sequelize.col('Transaction.createdAt')),
          { [Op.gte]: req.query.startDate },
        ) : null,
      req.query.endDate
        ? sequelize.where(
          sequelize.fn('DATE', sequelize.col('Transaction.createdAt')),
          { [Op.lte]: req.query.endDate },
        ) : null,
    ];
  }
  return filterAttributes;
}

export default {
  index: async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const offset = (page - 1) * limit;

      const limitQuery = limit === -1 ? {} : { limit };
      const whereFilter = await generateFilterAttributes(req);

      const TransactionCount = await Transaction.findAndCountAll({
        where: whereFilter,
        ...limitQuery,
        offset,
        order: [
          [
            literal(`
              CASE 
                WHEN error IS NOT NULL THEN 1 
                ELSE 0 
              END
            `),
            'DESC',
          ],
          ['createdAt', 'DESC'],
        ],
      });
      const TransactionsSize = TransactionCount.count;
      const totalPages = Math.ceil(TransactionsSize / limit);

      res.status(200).json({
        data: TransactionCount.rows,
        lastPage: totalPages,
        currentPage: page,
        limit,
        total: TransactionsSize,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  storeTransaction: [
    checkSchema(TransactionValidator.storeTransactionSchema),
    async (req: Request, res: Response) => {
      let newTransaction;
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ msg: errors.array() });
        }

        if (!req.user?.branch?.bank?.bankId) {
          throw new Error('Bank ID is missing for this user');
        }
        LogHelper.info(`Transaction | user (${userLogIdentifier(req)}) started a new transaction, payload: ${JSON.stringify(req.body)}`, '');

        // eslint-disable-next-line max-len
        const accountData = await RetrieveAccountService.getAccountDetails(req.body.accountNumber, req.user?.branch.bank.bankId);
        const partnerDetail = await PartnerDetail.findOne({
          where: { userId: req.user.id },
          include: [{
            model: PartnerDetailAccount,
            include: [Currency],
          }],
        });

        const operationCurrency = accountData.customerDetails.currency;

        const creditAccount = partnerDetail?.partnerDetailAccounts.find(
          (acc) => acc.currency.symbol === operationCurrency,
        );

        const contryCode = await Country.findOne({
          where: { code2: accountData.country },
        });

        if (creditAccount) {
          newTransaction = await Transaction.create({
            ...req.body,
            customerName: accountData.customerDetails.accountName,
            drAcctNum: req.body.accountNumber,
            crAcctNum: creditAccount.dataValues.accountNumber,
            countryCode: contryCode?.dataValues.code3,
            processingCode: 50,
            userId: req.user.id,
          });
          const { stan, tranDateTime, success } = await TransactionFinacleService.sendTransaction(newTransaction);
          await Transaction.update(
            { stan, tranDateTime, success },
            { where: { id: newTransaction.id } },
          );
          LogHelper.info(`Transaction | transaction (${newTransaction.id}) generated by user (${userLogIdentifier(req)}) for msisdn (${newTransaction.msisdn})`, '');
          return res.status(201).json(newTransaction);
        }
        LogHelper.info('Account number not found', '');
      } catch (error) {
        LogHelper.info(`Transaction | error occurred when treating transaction (${newTransaction?.id}) generated by user (${userLogIdentifier(req)}), error: (${error})`, '');
        await Transaction.update(
          { error: (error as Error).message },
          { where: { id: newTransaction?.id } },
        );
        return errorHandlerService.handleResponseError(res, error as Error);
      }
    },
  ],

  exportInCSV: async (req: Request, res: Response) => {
    try {
      const filename = `transaction-deallocation-${new Date().toISOString().replace(/:/g, '-')}.xlsx`;

      const whereFilter = await generateFilterAttributes(req);

      const transactions = await Transaction.findAll({
        where: whereFilter,
        attributes: {
          exclude: ['updatedAt', 'deletedAt'],
        },
        order: [
          ['createdAt', 'DESC'],
        ],
      });

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(transactions);

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

      res.send(excelBuffer);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getStats: async (req: Request, res: Response) => {
    const todayDate = getTodayDate();
    const yesterday = getYesterdayDate();
    const firstDayWeek = firstDayOfWeekDate();
    const lastDayWeek = lastDayOfWeekDate();
    const firstDayMonth = getFirstDayOfMonth();
    const lastDayMonth = getLastDayOfMonth();

    const whereFilter: WhereOptions = {};

    const nbToday = await Transaction.count({
      where: {
        ...whereFilter,
        success: true,
        [Op.and]: Sequelize.where(
          Sequelize.fn('DATE', Sequelize.col('Transaction.createdAt')),
          todayDate,
        ),
      },
    });

    const nbYesterday = await Transaction.count({
      where: {
        ...whereFilter,
        success: true,
        [Op.and]: Sequelize.where(
          Sequelize.fn('DATE', Sequelize.col('Transaction.createdAt')),
          yesterday,
        ),
      },
    });

    const nbWeek = await Transaction.count({
      where: {
        ...whereFilter,
        success: true,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn('DATE', Sequelize.col('Transaction.createdAt')),
            { [Op.gte]: firstDayWeek },
          ),
          Sequelize.where(
            Sequelize.fn('DATE', Sequelize.col('Transaction.createdAt')),
            { [Op.lte]: lastDayWeek },
          ),
        ],
      },
    });

    const nbMonth = await Transaction.count({
      where: {
        ...whereFilter,
        success: true,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn('DATE', Sequelize.col('Transaction.createdAt')),
            { [Op.gte]: firstDayMonth },
          ),
          Sequelize.where(
            Sequelize.fn('DATE', Sequelize.col('Transaction.createdAt')),
            { [Op.lte]: lastDayMonth },
          ),
        ],
      },
    });

    res.status(200).json({
      today: nbToday,
      yesterday: nbYesterday,
      currentWeek: nbWeek,
      currentMonth: nbMonth,
    });
  },
};
