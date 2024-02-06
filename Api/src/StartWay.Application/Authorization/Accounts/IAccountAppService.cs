using System.Threading.Tasks;
using Abp.Application.Services;
using StartWay.Authorization.Accounts.Dto;

namespace StartWay.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
