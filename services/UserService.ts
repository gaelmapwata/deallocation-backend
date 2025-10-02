import Permission from '../models/Permission';
import Role, { RoleE } from '../models/Role';
import User from '../models/User';

export default {
  async userByIdHasOneOfPermissions(userId: number, ...permissions: string[]): Promise<boolean> {
    const user = await User.findByPk(userId, {
      include: [{ model: Role, include: [Permission] }],
    });

    if (!user) {
      return false;
    }

    const userPermissions = user.roles.flatMap((role) => role.permissions);

    return permissions.some((permission) => {
      const allPermissionSlug = `${permission.split(':')[0]}:ALL`;
      return userPermissions.some((p) => p.slug === permission || p.slug === allPermissionSlug);
    });
  },

  async userIsAdmin(userId: number): Promise<boolean> {
    const user = await User.findByPk(userId, {
      include: [Role],
    });

    if (!user) {
      return false;
    }

    return !!user.roles.find((role) => role.name === RoleE.ADMIN);
  },
};
