using System.Threading.Tasks;
using Abp.Application.Services;
using StartWay.Sessions.Dto;

namespace StartWay.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
