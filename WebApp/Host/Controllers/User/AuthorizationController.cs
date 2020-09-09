using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WebApp.Host.Services.UserService;
using WebApp.Host.Services.UserService.Models;

namespace WebApp.Host.Controllers.User
{
    [Route("api/[controller]")]
    public class AuthorizationController : Controller
    {
        private readonly IUserService _userService;
        public AuthorizationController(IUserService userService)
        {
            _userService = userService;
        }
        
        [HttpGet]
        public async Task<ActionResult<UserDto>> Me()
        {
            var nameIdentifier = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(nameIdentifier, out var userId))
                return new BadRequestResult();

            var user = await _userService.GetById(userId);
            if (user is null)
                return new NotFoundResult();
            
            return user;
        }
        
        [HttpGet]
        public async Task<ActionResult<object>> SignIn(string login, string password)
        {
            var authorizedUser = await _userService.SignIn(login, password);
            if (authorizedUser is null)
                return new NotFoundResult();

            return GetToken(authorizedUser);
        }
        
        [HttpPut]
        public async Task<ActionResult<object>> SignUp(RegistrationDto data)
        {
            var registeredUser = await _userService.SignUp(data);
            if (registeredUser is null)
                return new BadRequestResult();

            return GetToken(registeredUser);
        }

        private object GetToken(UserDto user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name)
            };

            var identity = new ClaimsIdentity(
                claims,
                "Token",
                ClaimTypes.Name,
                ClaimTypes.Role
            );

            var now = DateTime.UtcNow;

            var jwtToken = new JwtSecurityToken(
                issuer: "JwtTokenIssuer",
                audience: "http://localhost:5000",
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(60000)),
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.ASCII.GetBytes("MySecretKey")),
                    SecurityAlgorithms.HmacSha256
                ));

            return new {access_token = new JwtSecurityTokenHandler().WriteToken(jwtToken)};
        }
    }
}