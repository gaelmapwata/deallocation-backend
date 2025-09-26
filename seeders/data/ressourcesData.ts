import Permission from '../../models/Permission';
import { RessourceI } from '../../types/Ressource';

const ressources: Array<RessourceI & {
  descriptionSlug?: string;
  descriptionPluralSlug?: string;
}> = [
  {
    name: 'user',
    descriptionSlug: 'un utilisateur',
    descriptionPluralSlug: 'utilisateurs',
    permissions: [
      { name: 'create', slug: Permission.USER.CREATE },
      { name: 'update', slug: Permission.USER.UPDATE },
      { name: 'read', slug: Permission.USER.READ },
      { name: 'delete', slug: Permission.USER.DELETE },
      { name: 'all', slug: Permission.USER.ALL },
    ],
  },
  {
    name: 'role',
    descriptionSlug: 'un rôle',
    descriptionPluralSlug: 'rôles',
    permissions: [
      { name: 'create', slug: Permission.ROLE.CREATE },
      { name: 'update', slug: Permission.ROLE.UPDATE },
      { name: 'read', slug: Permission.ROLE.READ },
      { name: 'delete', slug: Permission.ROLE.DELETE },
      { name: 'all', slug: Permission.ROLE.ALL },
    ],
  },
  {
    name: 'ressource',
    descriptionSlug: 'une ressource',
    descriptionPluralSlug: 'ressources',
    permissions: [
      { name: 'read', slug: Permission.RESSOURCE.READ },
      { name: 'all', slug: Permission.RESSOURCE.ALL },
    ],
  },
];

const RESSOURCES = ressources.map((ressource) => {
  const permissionsWithDescritption = ressource.permissions.map((permission) => {
    let description = null;
    if (permission.description) {
      description = permission.description;
    }
    if (permission.name === 'read') {
      description = `Peut voir la liste des ${ressource.descriptionPluralSlug}`;
    } else if (permission.name === 'create') {
      description = `Peut créer ${ressource.descriptionSlug}`;
    } else if (permission.name === 'update') {
      description = `Peut mettre à jour ${ressource.descriptionSlug}`;
    } else if (permission.name === 'delete') {
      description = `Peut supprimer ${ressource.descriptionSlug}`;
    } else if (permission.name === 'all') {
      description = `À accès à toute la gestion des ${ressource.descriptionPluralSlug}`;
    }
    return { ...permission, description };
  });

  return { ...ressource, permissions: permissionsWithDescritption };
});

export default RESSOURCES;
