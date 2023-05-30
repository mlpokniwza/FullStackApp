using Microsoft.AspNetCore.Identity;

namespace ProjectAPI.Models
{
    public class Role : IdentityRole<int>
    {
        public ICollection<UserRole> UserRoles { get; set; }
    }
}