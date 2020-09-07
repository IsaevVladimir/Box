using System;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Common;
using WebApp.DataAccess.DataModels;
using WebApp.DataAccess.Repositories;
using WebApp.Host.Services.UserService.Models;

namespace WebApp.Host.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly UserRepository _userRepository;
        public UserService(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        
        public async Task<UserDto> SignIn(string login, string password)
        {
            var allUsers = await _userRepository.GetAll();
            var foundedUser = allUsers.FirstOrDefault(x =>
                string.Equals(login, x.Login, StringComparison.OrdinalIgnoreCase)
                && PasswordHelper.Verify(password, x.PasswordHash));
            
            if (foundedUser is null)
                return null;

            return ServiceMapper.Mapper.Map<UserDto>(foundedUser);
        }
        
        public async Task<UserDto> SignUp(RegistrationDto registrationDto)
        {
            var userDm = ServiceMapper.Mapper.Map<UserDm>(registrationDto);
            return ServiceMapper.Mapper.Map<UserDto>(await _userRepository.Add(userDm));
        }
    }
}