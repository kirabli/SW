using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StartWay.Base.Dto;
using StartWay.Module.Xlog;
using StartWay.Module.Xlog.Dto;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;

namespace StartWay.Service.XlogService
{
    /// <summary>
    /// 
    /// </summary>
    public class XlogAppService :AsyncCrudAppService<Xlog,XlogDto>
    {
        public IRepository<Xlog> _repository { get; set; }
        public XlogAppService(IRepository<Xlog> repository):base(repository) 
        {
            _repository = repository;
        }
        public async Task<PagedResultDto<XlogDto>> GetAllPage(PagedRequest input)
        {
            var query = _repository.GetAll();
            var count = query.Count();
            var list = (await query.PageBy(input).ToListAsync()).MapTo<List<XlogDto>>();
            return new PagedResultDto<XlogDto>(count, list);
        }

    }
}
