using Microsoft.AspNetCore.Identity;

namespace ProjectAPI.Models
{
    public class User : IdentityUser<int>
    {
        public DateOnly DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public List<Photo> Photos { get; set; } = new();

        public List<Message> MessageSent { get; set; }
        public List<Message> MessageReceived { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }

    }

}
