using ProjectAPI.Models;

namespace ProjectAPI.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}