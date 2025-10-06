import AppError from '../types/CustomError';

// eslint-disable-next-line import/prefer-default-export
export const UBAUtilities = {
  getAccountToCredited(devise: string) {
    if (devise === 'CDF') {
      return '010110000064';
    } if (devise === 'USD') {
      return '010120000055';
    }
    throw new AppError('Aucune devise fournie', 400);
  },
};
