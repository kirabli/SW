using Abp.Localization;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Runtime.Security;
using Abp.Timing;
using Abp.Zero;
using Abp.Zero.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using StartWay.Configuration;

namespace StartWay
{
    [DependsOn(typeof(AbpZeroCoreModule))]
    public class StartWayCoreSWModule : AbpModule
    {
        private readonly IConfigurationRoot _appConfiguration;

        public StartWayCoreSWModule(IHostingEnvironment env)
        {
            _appConfiguration = AppConfigurations.Get(env.ContentRootPath, env.EnvironmentName, env.IsDevelopment());
        }
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(StartWayCoreSWModule).GetAssembly());
        }

    }
}
