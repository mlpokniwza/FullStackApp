using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProjectAPI.Data;
using ProjectAPI.DTO;
using ProjectAPI.Interfaces;
using ProjectAPI.Models;

namespace ProjectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        // private readonly IAuthRepository _repo;
        // private readonly IConfiguration _config;
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AuthController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromBody] UserForRegisterDto userForRegisterDto)
        {
            // if (await UserSecretsConfigurationExtensions(userForRegisterDto.Username)) return BadRequest("Username is already taken");

            using var hmac = new HMACSHA512();

            var user = new User
            {
                Username = userForRegisterDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userForRegisterDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.Username,
                Token = _tokenService.CreateToken(user),
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(UserForLoginDto userForLoginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x =>
            x.Username == userForLoginDto.Username);

            if (user == null) return Unauthorized("invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userForLoginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("invalid password");
            }

            return new UserDto
            {
                Username = user.Username,
                Token = _tokenService.CreateToken(user),
            };
        }

        // [HttpPost("login")]
        // public async Task<ActionResult<User>> Login([FromBody] UserForLoginDto userForLoginDto)
        // {
        //     //check user matches
        //     var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

        //     if (userFromRepo == null)
        //         return Unauthorized("invalid username");

        //     var claims = new[]
        //     {
        //         new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
        //         new Claim(ClaimTypes.Name, userFromRepo.Username)
        //     };
        //     // create security key
        //     var key = new SymmetricSecurityKey(Encoding.UTF8
        //         .GetBytes(_config.GetSection("AppSettings:Token").Value));

        //     // encrypt key with hashing algorithm
        //     var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        //     var tokenDescriptor = new SecurityTokenDescriptor
        //     {
        //         Subject = new ClaimsIdentity(claims),
        //         Expires = DateTime.Now.AddDays(1),
        //         SigningCredentials = creds
        //     };

        //     var tokenHandler = new JwtSecurityTokenHandler();

        //     var token = tokenHandler.CreateToken(tokenDescriptor);

        //     return Ok(new
        //     {
        //         username = userForLoginDto.Username,
        //         token = tokenHandler.WriteToken(token)
        //     });
        // }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.Username == username.ToLower());
        }
    }
}