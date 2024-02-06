using Abp.Application.Services;
using Abp.Domain.Repositories;
using Microsoft.AspNetCore.Http;
using StartWay.Module.Xlog;
using StartWay.Module.Xlog.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
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

    }
}
