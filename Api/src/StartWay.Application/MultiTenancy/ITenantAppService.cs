using Abp.Application.Services;
using StartWay.MultiTenancy.Dto;

namespace StartWay.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

