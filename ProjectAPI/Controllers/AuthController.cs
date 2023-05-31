using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectAPI.DTO;
using ProjectAPI.Interfaces;
using ProjectAPI.Models;

namespace ProjectAPI.Controllers
{
    public class AuthController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public AuthController(UserManager<User> userManager, ITokenService tokenService, IMapper mapper)
        {
            _mapper = mapper;
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(UserForRegisterDto userForRegisterDto)
        {
            if (await UserExists(userForRegisterDto.UserName)) return BadRequest("UserName is already taken");

            var user = _mapper.Map<User>(userForRegisterDto);

            user.UserName = userForRegisterDto.UserName.ToLower();

            var result = await _userManager.CreateAsync(user, userForRegisterDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                KnownAs = user.KnownAs
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(UserForLoginDto userForLoginDto)
        {
            var user = await _userManager.Users
            .Include(p => p.Photos)
            .SingleOrDefaultAsync(x => x.UserName == userForLoginDto.UserName);

            if (user == null) return Unauthorized("invalid username");

            var result = await _userManager.CheckPasswordAsync(user, userForLoginDto.Password);

            if (!result) return Unauthorized("Invalid password");


            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                KnownAs = user.KnownAs
            };
        }
        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}