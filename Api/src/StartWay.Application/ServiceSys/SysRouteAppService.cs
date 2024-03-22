using Abp.Application.Services;
using Abp.Domain.Repositories;
using StartWay.Module.Xlog;
using StartWay.Core.SW.Module.Sys.SysRoutes;
using StartWay.Core.SW.Module.Sys.SysRoutes.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StartWay.ServiceSys
{
    public class SysRouteAppService : ApplicationService
    {
        public IRepository<SysRoute, int> _repository;

        public  readonly SysRouteManager _sysRouteManager;
        //public SysRouteAppService(IRepository<SysRoute, int> repository)
        //{
        //    _repository = repository;
        //}
        public SysRouteAppService(IRepository<SysRoute, int> repository, SysRouteManager sysRouteManager)
        {
            _repository = repository;
            _sysRouteManager = sysRouteManager;
        }

        //public SysRouteAppService(SysRouteManager sysRouteManager)
        //{
        //    _sysRouteManager = sysRouteManager;
        //}

        /// <summary>
        /// 得到全部路由
        /// </summary>
        /// <param name="routeids"></param>
        /// <returns></returns>
        public async Task<List<FatherDto>> GetAllRoute(CheckRoute input)
        {
            return await _sysRouteManager.GetAllRoute(input);
        }
    }
}
