using ProjectAPI.Models;

namespace ProjectAPI.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(User user);
    }
}