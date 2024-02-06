using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace StartWay.Controllers
{
    public abstract class StartWayControllerBase: AbpController
    {
        protected StartWayControllerBase()
        {
            LocalizationSourceName = StartWayConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
