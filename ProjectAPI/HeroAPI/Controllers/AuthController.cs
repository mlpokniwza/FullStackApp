using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HeroAPI.Data;
using HeroAPI.DTO;
using HeroAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace HeroAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;

        public AuthController(IAuthRepository repo)
        {
            _repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            // validate username and password
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await _repo.UserExists(userForRegisterDto.Username))
                return BadRequest("Username already exists");

            var userToCreate = new User { Username = userForRegisterDto.Username };

            var createUser = await _repo.Register(userToCreate, userForRegisterDto.Username);

            return StatusCode(201);
        }
    }
}