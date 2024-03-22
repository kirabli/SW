using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StartWay.Core.SW.Module.Sys.SysRoutes.Dto
{
    public class Meta
    {
        //标题
        public string Title { get; set; }
        //icon图标
        public string Icon { get; set; }
        public int? Type { get; set; }
        public List<string> Roles { get; set; }
    }
}
