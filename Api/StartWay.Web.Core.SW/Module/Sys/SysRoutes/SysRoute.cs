using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;

namespace StartWay.Web.Core.SW.Module.Sys.SysRoutes
{
    public class SysRoute: Entity<int>
    {
        [MaxLength(200)]
        //名字
        public string Name { get; set; }
        //权限
        //public string Permission { get; set; }
        //路径
        [MaxLength(200)]
        public string Path { get; set; }
        //标题
        [MaxLength(200)]
        public string Title { get; set; }
        //文件路径名
        [MaxLength(200)]
        public string Component { get; set; }
        //图标
        [MaxLength(50)]
        public string? Icon { get; set; }
        //排序id
        [MaxLength(200)]
        public string? Roles { get; set; }
        public int? Interparam { get; set; }
        //他的父节点的名字
        [MaxLength(200)]
        public string? FatherNodeName { get; set; }
        // 0 UI端 1管理端
        public int? Type { get; set; } = 0;
    }
}
