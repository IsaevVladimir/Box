using System.Threading.Tasks;
using WebApp.Host.Services.UserService.Models;

namespace WebApp.Host.Services.UserService
{
    public interface IUserService
    {
        public Task<UserDto> SignIn(string login, string password);
        public Task<UserDto> SignUp(RegistrationDto registrationDto);
        
        public Task<UserDto> GetById(int id);
    }
}