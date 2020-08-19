using WebApp.Services.UserService.Models;

namespace WebApp.Services.UserService
{
    public interface IUserService
    {
        public UserDto SignIn(string login, string password);
        public UserDto SignUp(RegistrationDto registrationDto);
    }
}