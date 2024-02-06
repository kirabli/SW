using System.Threading.Tasks;
using StartWay.Models.TokenAuth;
using StartWay.Web.Controllers;
using Shouldly;
using Xunit;

namespace StartWay.Web.Tests.Controllers
{
    public class HomeController_Tests: StartWayWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}