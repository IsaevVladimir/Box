using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApp.Host.Services.UserService;
using WebApp.Host.Services.UserService.Models;

namespace WebApp.Host.Controllers.User
{
    public class SignInController : Controller
    {
        private readonly IUserService _userService;
        public SignInController(IUserService userService)
        {
            _userService = userService;
        }
        
        [HttpGet]
        public async Task<ActionResult<UserDto>> Get(string login, string password)
        {
            var authorizedUser = await _userService.SignIn(login, password);
            if (authorizedUser is null)
                return new NotFoundResult();

            return authorizedUser;
        }
    }
}