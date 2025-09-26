import Permission from '../models/Permission';
import Role from '../models/Role';
import User from '../models/User';

export default {
  async userByIdHasOneOfPermissions(userId: number, ...permissions: string[]): Promise<boolean> {
    const user = await User.findByPk(userId, {
      include: [{ model: Role, include: [Permission] }],
    });

    const userPermissions = user?.roles.flatMap((role) => role.permissions);
    return !!userPermissions?.find((p) => permissions.includes(p.slug));
  },
};
