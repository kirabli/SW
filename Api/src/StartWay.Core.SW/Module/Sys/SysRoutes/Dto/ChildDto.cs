using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StartWay.Core.SW.Module.Sys.SysRoutes.Dto
{
    [AutoMap(typeof(SysRoute))]
    public class ChildDto : INodeDto
    {
        public string Name { get; set; }
        public string Path { get; set; }
        public string Title { get; set; }
        public string Component { get; set; }
        public string? Icon { get; set; }
        public int? Interparam { get; set; }
        public string? FatherNodeName { get; set; }
        public string? Remark { get; set; }
        public string? Roles { get; set; }
        public int? Type { get; set; }
        public Meta Meta { get; set; }
        public List<ChildDto>? Children { get; set; } = [];
    }
    
}
