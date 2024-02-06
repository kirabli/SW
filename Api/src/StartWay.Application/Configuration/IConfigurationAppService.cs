using System.Threading.Tasks;
using StartWay.Configuration.Dto;

namespace StartWay.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
