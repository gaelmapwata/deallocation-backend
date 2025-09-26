import Permission from '../../models/Permission';
import { RoleI } from '../../types/Role';

const ROLES: RoleI[] = [
  {
    name: 'super-admin',
    permissions: [
      Permission.ROLE.ALL,
      Permission.USER.ALL,
      Permission.RESSOURCE.ALL,
    ],
  },
  {
    name: 'admin',
    permissions: [
      Permission.ROLE.READ,
      Permission.USER.ALL,
    ],
  },
  {
    name: 'user',
    permissions: [],
  },
];

export default ROLES;
