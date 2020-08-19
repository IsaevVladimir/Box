using System;
using System.Linq;
using Common;
using DataAccess.DataModels;
using DataAccess.Repositories;
using WebApp.Services.UserService.Models;

namespace WebApp.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly UserRepository _userRepository;
        public UserService(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        
        public UserDto SignIn(string login, string password)
        {
            var foundedUser = _userRepository.GetAll().Result.FirstOrDefault(x =>
                string.Equals(login, x.Login, StringComparison.OrdinalIgnoreCase)
                && PasswordHelper.Verify(password, x.PasswordHash));
            
            if (foundedUser is null)
                return null;

            return ServiceMapper.Mapper.Map<UserDto>(foundedUser);
        }
        
        public UserDto SignUp(RegistrationDto registrationDto)
        {
            var userDm = ServiceMapper.Mapper.Map<UserDm>(registrationDto);
            return ServiceMapper.Mapper.Map<UserDto>(_userRepository.Add(userDm));
        }
    }
}