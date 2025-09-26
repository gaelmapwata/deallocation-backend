/* eslint-disable import/no-import-module-exports */
import { QueryInterface } from 'sequelize';
import Permission from '../models/Permission';
import Ressource from '../models/Ressource';
import sequelize from '../sequelize-instance';
import { RessourceI } from '../types/Ressource';
import RESSOURCES from './data/ressourcesData';

module.exports = {
  up: () => new Promise((resolve, reject) => {
    // eslint-disable-next-line max-len
    const saveRessource = async (ressource: RessourceI): Promise<void> => new Promise((resolveRessource) => {
      Ressource.findOrCreate({
        where: { name: ressource.name },
        defaults: { name: ressource.name },
      }).then(([ressourceCreated]) => {
        Promise.all(
          ressource.permissions.map((permission) => Permission.findOrCreate({
            where: { slug: permission.slug },
            defaults: {
              ...permission,
              ressourceId: ressourceCreated.id,
            },
          })),
        )
          .then(() => {
            resolveRessource();
          });
      });
    });

    sequelize.authenticate()
      .then(() => {
        Promise.all(
          RESSOURCES.map((ressource) => saveRessource(ressource)),
        )
          .then(() => resolve(null));
      })
      .catch((error: Error) => {
        reject(error);
      });
  }),

  down: async (queryInterface: QueryInterface) => {
    // Your rollback logic here
    await queryInterface.bulkDelete('permissions', {}, {});
    await queryInterface.bulkDelete('ressources', {}, {});

    // Return a Promise that resolves when the rollback is complete
    return Promise.resolve();
  },
};
