using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using StartWay.EntityFrameworkCore;
using StartWay.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace StartWay.Web.Tests
{
    [DependsOn(
        typeof(StartWayWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class StartWayWebTestModule : AbpModule
    {
        public StartWayWebTestModule(StartWayEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(StartWayWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(StartWayWebMvcModule).Assembly);
        }
    }
}