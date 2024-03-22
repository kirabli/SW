using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StartWay.Web.Core.SW.Module.Sys.SysRoutes.Dto
{
    public interface INodeDto
    {
        string Name { get; set; }
        //路径
        string Path { get; set; }
        //标题
        string Title { get; set; }
        Meta Meta { get; set; }
        //文件路径名
        string Component { get; set; }
        //图标
        string Icon { get; set; }

        string Roles { get; set; }
    }
}
