using Abp.Authorization;
using StartWay.Authorization.Roles;
using StartWay.Authorization.Users;

namespace StartWay.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
