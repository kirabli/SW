using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using StartWay.Configuration;
using Abp.AspNetCore.Configuration;

namespace StartWay.Web.Host.Startup
{
    [DependsOn(
       typeof(StartWayWebCoreModule))]
    public class StartWayWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public StartWayWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(StartWayWebHostModule).GetAssembly());
        }
        public override void PreInitialize()
        {
            Configuration.Modules.AbpAspNetCore().UseMvcDateTimeFormatForAppServices = true;
        }
    }
}
