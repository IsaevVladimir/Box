using Microsoft.AspNetCore.Mvc;
using WebApp.Services.UserService;
using WebApp.Services.UserService.Models;

namespace WebApp.Controllers.User
{
    public class SignUpController : Controller
    {
        private readonly IUserService _userService;
        public SignUpController(IUserService userService)
        {
            _userService = userService;
        }
        
        [HttpPost]
        public ActionResult<UserDto> Post(RegistrationDto data)
        {
            var registeredUser = _userService.SignUp(data);
            if (registeredUser is null)
                return new BadRequestResult();

            return registeredUser;
        }
    }
}