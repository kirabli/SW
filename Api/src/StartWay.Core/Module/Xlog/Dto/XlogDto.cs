using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StartWay.Module.Xlog.Dto
{
    [AutoMap(typeof(Xlog))]
    public class XlogDto : FullAuditedEntityDto
    {
        public string Log { get; set; }
    }
}
