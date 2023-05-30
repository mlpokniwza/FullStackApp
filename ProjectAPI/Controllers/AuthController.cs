using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectAPI.Data;
using ProjectAPI.DTO;
using ProjectAPI.Interfaces;
using ProjectAPI.Models;

namespace ProjectAPI.Controllers
{
    public class AuthController : BaseApiController
    {
        // private readonly IAuthRepository _repo;
        // private readonly IConfiguration _config;
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly Mapper _mapper;

        public AuthController(DataContext context, ITokenService tokenService, Mapper mapper)
        {
            _mapper = mapper;
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromBody] UserForRegisterDto userForRegisterDto)
        {
            if (await UserExists(userForRegisterDto.UserName)) return BadRequest("UserName is already taken");

            var user = _mapper.Map<User>(userForRegisterDto);

            user.UserName = userForRegisterDto.UserName.ToLower();

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user),
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(UserForLoginDto userForLoginDto)
        {
            var user = await _context.Users
            .Include(p => p.Photos)
            .SingleOrDefaultAsync(x => x.UserName == userForLoginDto.UserName);

            if (user == null) return Unauthorized("invalid username");

            return new UserDto
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url
            };
        }
        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}