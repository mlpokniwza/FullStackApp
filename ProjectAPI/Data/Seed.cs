using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ProjectAPI.Models;

namespace ProjectAPI.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<User> userManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var users = JsonSerializer.Deserialize<List<User>>(userData);

            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();
                // user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0ord"));
                // user.PasswordSalt = hmac.Key;

                await userManager.CreateAsync(user, "Pa$$w0ord");
            }
        }
    }
}