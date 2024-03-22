using Abp.Application.Services;
using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.ObjectMapping;
using StartWay.Core.SW.Module.Sys.SysRoutes.Dto;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using Abp.Linq.Extensions;
using Abp.Collections.Extensions;

namespace StartWay.Core.SW.Module.Sys.SysRoutes
{
    public class SysRouteManager : ApplicationService, IDomainService
    {
        public readonly IRepository<SysRoute, int> _entityRepository;

        public SysRouteManager(IRepository<SysRoute, int> entityRepository)
        {
            _entityRepository = entityRepository;
        }
        /// <summary>
        /// 得到全部路由
        /// </summary>
        /// <param name="routeids"></param>
        /// <returns></returns>
        public async Task<List<FatherDto>> GetAllRoute(CheckRoute input)
        {
            //得到父亲节点
            var entityFather = await GetFatherSort();
            entityFather = entityFather.WhereIf(!input.Role.IsNullOrEmpty(), e => e.Meta.Roles!=null && e.Meta.Roles.Contains(input.Role)).ToList();
            //得到孩子节点
            var entityChild = await GetChildSort();
            entityChild = entityChild.WhereIf(!input.Role.IsNullOrEmpty(), e => e.Meta.Roles != null && e.Meta.Roles.Contains(input.Role)).ToList();
            //循环组装路由
            foreach (var item in entityFather)
            {
                item.Children = entityChild.Where(a => a.FatherNodeName == item.Name).ToList();
            }

            return entityFather;
        }


        /// <summary>
        /// 全部父亲节点集合
        /// </summary>
        /// <returns></returns>
        public async Task<List<FatherDto>> GetFatherSort()
        {
            var entity = await (_entityRepository.GetAll()
                        .Where(a => a.FatherNodeName == null || a.FatherNodeName.Length == 0)
                        .OrderBy(a => a.Interparam)).ToListAsync();
            var fatherList = GetMeta<FatherDto>(entity);

            return fatherList;
        }
        /// <summary>
        /// 全部子表节点集合
        /// </summary>
        /// <returns></returns>
        public async Task<List<ChildDto>> GetChildSort()
        {

            var entity = await (_entityRepository.GetAll().Where(a => a.FatherNodeName != null && a.FatherNodeName.Length > 0).OrderBy(a => a.Interparam)).Select(a => a)
                .ToListAsync();

            //过滤组装
            var childList = GetMeta<ChildDto>(entity);

            return ObjectMapper.Map<List<ChildDto>>(childList);
        }

        private List<T> GetMeta<T>(List<SysRoute> entity) where T : class, INodeDto
        {

            List<T> nodeList = new List<T>();
            foreach (var i in entity)
            {
                var isHave = nodeList.Where(a => a.Name == i.Name).Count();
                if (isHave < 1)
                {
                    var message = ObjectMapper.Map<T>(i);
                    message.Meta = new Meta { Title = i.Title, Icon = i.Icon,Roles =[.. i.Roles.Split(',')],Type = i.Type };
                    nodeList.Add(message);
                }
            }
            return nodeList;
        }

    }
}
