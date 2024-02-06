using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using StartWay.Authorization;

namespace StartWay
{
    [DependsOn(
        typeof(StartWayCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class StartWayApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<StartWayAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(StartWayApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
