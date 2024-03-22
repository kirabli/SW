using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using StartWay.Authorization.Roles;
using StartWay.Authorization.Users;
using StartWay.MultiTenancy;
using StartWay.Module.Xlog;
using StartWay.Web.Core.SW.Module.Sys.SysRoutes;

namespace StartWay.EntityFrameworkCore
{
    public class StartWayDbContext : AbpZeroDbContext<Tenant, Role, User, StartWayDbContext>
    {
        /* Define a DbSet for each entity of the application */

        public StartWayDbContext(DbContextOptions<StartWayDbContext> options)
            : base(options)
        {

        }
        public DbSet<Xlog> Xlogs { get; set; }
        public DbSet<SysRoute> SysRoutes { get; set; }
    }
}
