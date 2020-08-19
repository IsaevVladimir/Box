using Microsoft.AspNetCore.Mvc;
using WebApp.Services.UserService;
using WebApp.Services.UserService.Models;

namespace WebApp.Controllers.User
{
    public class SignInController : Controller
    {
        private readonly IUserService _userService;
        public SignInController(IUserService userService)
        {
            _userService = userService;
        }
        
        [HttpGet]
        public ActionResult<UserDto> Get(string login, string password)
        {
            var authorizedUser = _userService.SignIn(login, password);
            if (authorizedUser is null)
                return new NotFoundResult();

            return authorizedUser;
        }
    }
}