using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApp.Host.Services.UserService;
using WebApp.Host.Services.UserService.Models;

namespace WebApp.Host.Controllers.User
{
    [Route("api/[controller]")]
    public class SignUpController : Controller
    {
        private readonly IUserService _userService;
        public SignUpController(IUserService userService)
        {
            _userService = userService;
        }
        
        [HttpPost]
        public async Task<ActionResult<UserDto>> Post(RegistrationDto data)
        {
            var registeredUser = await _userService.SignUp(data);
            if (registeredUser is null)
                return new BadRequestResult();

            return registeredUser;
        }
    }
}