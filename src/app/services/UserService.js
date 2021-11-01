import { getAuthenticatedUser } from '@edx/frontend-platform/auth';

class UserService {
  static isUserEnterpriseAdmin() {
    const user = getAuthenticatedUser();
    return user.administrator;
  }

  static getUserEnterpriseAdminUuid() {
    const user = getAuthenticatedUser();
    const adminRole = user.roles.find((element) => element.search(/enterprise_admin/ui) >= 0);
    let uuid = null;
    if (adminRole) {
      /* eslint-disable prefer-destructuring */
      uuid = adminRole.split(':')[1];
      /* eslint-enable prefer-destructuring */
    }
    return uuid;
  }

  static canUserCreateClassroom() {
    return this.getUserEnterpriseAdminUuid();
  }
}

export default UserService;
