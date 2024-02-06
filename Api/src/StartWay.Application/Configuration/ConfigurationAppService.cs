using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using StartWay.Configuration.Dto;

namespace StartWay.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : StartWayAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
