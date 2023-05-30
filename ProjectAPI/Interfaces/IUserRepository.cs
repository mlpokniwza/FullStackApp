using ProjectAPI.DTO;
using ProjectAPI.Helpers;
using ProjectAPI.Models;

namespace ProjectAPI.Interfaces
{
    public interface IUserRepository
    {
        void Update(User user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<User>> GetUserAsync();
        Task<User> GetUserByIdAsync(int id);
        Task<User> GetUserByUserNameAsync(string username);
        Task<PagedList<MemberDto>> GetMemberAsync(UserParams userParams);
        Task<MemberDto> GetMemberAsync(string username);


    }
}