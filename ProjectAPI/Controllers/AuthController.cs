using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProjectAPI.Data;
using ProjectAPI.DTO;
using ProjectAPI.Models;

namespace ProjectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;

        private readonly IConfiguration _config;
        private readonly DataContext _context;

        public AuthController(IAuthRepository repo, IConfiguration config, DataContext context)
        {
            _config = config;
            _repo = repo;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register([FromBody] UserForRegisterDto userForRegisterDto)
        {
            // validate username and password
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await _repo.UserExists(userForRegisterDto.Username))
                return BadRequest("Username already exists");

            var userToCreate = new User { Username = userForRegisterDto.Username };

            var createUser = await _repo.Register(userToCreate, userForRegisterDto.Username);

            return createUser;
        }

        
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(UserForLoginDto userForLoginDto)
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

            return user;
        }
    }
}